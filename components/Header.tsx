import Image from 'next/image'
import Link from 'next/link'

export default function Header({
  photo,
  email,
}: {
  photo?: string
  email?: string
}) {
  return (
    <header className="xs:flex-row mt-3 flex w-full flex-col items-center justify-between gap-2 border-b border-gray-500 px-2 pb-7 sm:px-4">
      <Link href="/dream" className="flex space-x-2">
        <Image
          alt="header text"
          src="/spade.png"
          className="h-9 w-9 sm:h-10 sm:w-10"
          width={24}
          height={24}
        />
        <h1 className="ml-2 text-xl font-bold tracking-tight sm:text-3xl">
          yardGPT.design
        </h1>
      </Link>
      {/* {email ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-blue-400 transition"
          >
            <div>Dashboard</div>
          </Link>
          <Link
            href="/get-credits"
            className="border-r border-gray-300 pr-4 flex space-x-2 hover:text-blue-400 transition"
          >
            <div>Buy Credits</div>
            <div className="text-blue-500 bg-blue-200 rounded-full px-2 text-xs flex justify-center items-center font-bold">
              New
            </div>
          </Link>
          {photo ? (
            <Image
              alt="Profile picture"
              src={photo}
              className="w-10 rounded-full"
              width={32}
              height={28}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white" />
          )}
        </div>
      ) : (
        <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-blue-600 text-white px-5 py-2 text-sm shadow-md hover:bg-blue-400 bg-blue-600 font-medium transition"
          href="/dream"
        >
          <p>Sign Up </p>
        </Link>
      )} */}
    </header>
  )
}
