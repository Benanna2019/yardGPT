import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SquigglyLines from '../components/SquigglyLines'
import { Testimonials } from '../components/Testimonials'

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Head>
        <title>YardGPT</title>
      </Head>

      <Header />
      <main className=" mt-20 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <a
          href="https://vercel.fyi/roomGPT"
          target="_blank"
          rel="noreferrer"
          className="mb-5 rounded-lg border border-gray-700 py-2 px-4 text-sm text-gray-700 transition duration-300 ease-in-out hover:text-gray-400"
        >
          Clone and deploy your own with{' '}
          <span className="text-blue-600">Vercel</span>
        </a>
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-normal text-gray-800 sm:text-7xl">
          Generating dream yards & gardens{' '}
          <span className="relative whitespace-nowrap text-emerald-600">
            <SquigglyLines />
            <span className="relative">through AI</span>
          </span>{' '}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg leading-7 sm:text-gray-600">
          Take a picture of your garden and see how your yard/garden looks in
          different themes. 100% free – remodel your garden/yard today.
        </h2>
        <Link
          className="mt-8 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-500 sm:mt-10"
          href="/dream"
        >
          Generate your dream garden
        </Link>
        <div className="mt-6 flex w-full flex-col items-center justify-between sm:mt-10">
          <div className="mt-4 mb-16 flex flex-col space-y-10">
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              <div>
                <h3 className="mb-1 text-lg font-medium">Original Garden</h3>
                <Image
                  alt="Original photo of a yard with yardGPT.io"
                  src="/original-pic.jpeg"
                  className="h-96 w-full rounded-lg object-cover"
                  width={400}
                  height={400}
                />
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium">Generated Garden</h3>
                <Image
                  alt="Generated photo of a yard with yardGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic.jpeg"
                  className="mt-2 h-96 w-full rounded-lg object-cover sm:mt-0"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}

export default Home
