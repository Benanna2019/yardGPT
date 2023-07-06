import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SquigglyLines from '../components/SquigglyLines'

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Head>
        <title>YardGPT</title>
      </Head>

      <Header />
      <main className="mt-20 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-normal text-gray-800 sm:text-7xl">
          Thank you for your interest in{' '}
          <span className="relative whitespace-nowrap text-emerald-600">
            <SquigglyLines />
            <span className="relative">Yard GPT Design</span>
          </span>{' '}
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg leading-7 sm:text-gray-600">
          The project has become bigger than expected and I am currently working
          to pass it over to a new maintainer.
        </h2>
        {/* <Link
          className="mt-8 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white transition hover:bg-emerald-500 sm:mt-10"
          href="/dream"
        >
          Start dreaming
        </Link>
        <div className="mt-6 flex w-full flex-col items-center justify-center sm:mt-10">
          <div className="mt-4 mb-16 flex flex-col space-y-10">
            <div className="flex flex-col w-full sm:flex-row sm:space-x-8">
              <div className="w-1/2">
                <h3 className="mb-1 text-lg font-medium">Original</h3>
                <img
                  alt="Original photo of a yard with yardGPT.io"
                  src="/original-pic.jpeg"
                  className="h-96 w-full rounded-lg object-cover border-4 border-red-600"
                />
              </div>
              <div className="mt-8 sm:mt-0 w-1/2">
                <h3 className="mb-1 text-lg font-medium">Generated</h3>
                <img
                  alt="Generated photo of a yard with yardGPT.io"
                  src="/generated-pic.jpeg"
                  className="h-96 rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div> */}
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}

export default Home
