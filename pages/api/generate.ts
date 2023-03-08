import { Ratelimit } from '@upstash/ratelimit'
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import redis from '../../utils/redis'

export type GenerateResponseData = {
  original: string | null
  generated: string | null
  id: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string
    theme: string
    yard: string
  }
}

// Create a new ratelimiter, that allows 3 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(3, '1440 m'),
      analytics: true,
    })
  : undefined

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<GenerateResponseData | string>
) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req)
    const result = await ratelimit.limit(identifier!)
    res.setHeader('X-RateLimit-Limit', result.limit)
    res.setHeader('X-RateLimit-Remaining', result.remaining)

    if (!result.success) {
      res
        .status(429)
        .json(
          "We're temporarily limiting generations to 3 per day because of high traffic. For any questions, email hassan@hey.com"
        )
      return
    }
  }

  const { imageUrl, theme, yard } = req.body
  // POST request to Replicate to start the image restoration generation process
  let startResponse = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
      input: {
        image: imageUrl,
        prompt: `a ${theme.toLowerCase()} ${yard.toLowerCase()}`,
        a_prompt:
          'best quality, extremely detailed, clean, garden, ultra-detailed, ultra-realistic, award-winning, decorative rock, landscape designer, keep buildings as is, do not change architecture',
      },
    }),
  })

  let jsonStartResponse = await startResponse.json()

  let endpointUrl = jsonStartResponse.urls.get
  const originalImage = jsonStartResponse.input.image
  const yardId = jsonStartResponse.id

  // GET request to get the status of the image restoration process & return the result when it's ready
  let generatedImage: string | null = null
  while (!generatedImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log('polling for result...')
    let finalResponse = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
      },
    })
    let jsonFinalResponse = await finalResponse.json()

    if (jsonFinalResponse.status === 'succeeded') {
      generatedImage = jsonFinalResponse.output[1] as string
    } else if (jsonFinalResponse.status === 'failed') {
      break
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  res.status(200).json(
    generatedImage
      ? {
          original: originalImage,
          generated: generatedImage,
          id: yardId,
        }
      : 'Failed to restore image'
  )
}
