import { useSession } from "next-auth/react";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";
import useSWR from "swr";

export default function Pricing() {
  const { data: session } = useSession();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/remaining", fetcher);

  return (
    <div className="flex mx-auto max-w-7xl overflow-visible flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Buy YardGPT Design Credits</title>
      </Head>
      <Script src="https://js.stripe.com/v3/pricing-table.js" />
      <Script src="https://cdn.paritydeals.com/banner.js" />
      <Header
        photo={session?.user?.image || undefined}
        email={session?.user?.email || undefined}
      />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mb-0 mb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Buy YardGPT Design Credits
            </p>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 mb-10">
          You currently have{" "}
          <span className="font-semibold text-gray-900">
            {data?.remainingGenerations}{" "}
            {data?.remainingGenerations > 1 ? "credits" : "credit"}
          </span>
          . Purchase more below.
        </p>
      </main>
      <div className="w-full">
        {session?.user?.email && (
          // @ts-ignore
          <stripe-pricing-table
            pricing-table-id="prctbl_1MphfkCvGFED1fF2a9hkaUyN"
            publishable-key="pk_live_51IVMuwCvGFED1fF2uQju4DEjVMLKHUp5Xo6BM62fGXMcPX9BGrCAPx9KxmnikzWbwKbTa5VfiMD7f2eWtyj5qQ7I00EMDMMLHG"
            client-reference-id={session.user.email}
            customer-email={session.user.email}
          />
        )}
      </div>
      <div className="mt-10 text-center">
        <h4 className="flex-none leading-6 mt-2 text-2xl font-bold tracking-tight text-black sm:text-5xl">
          What’s included
        </h4>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-900 sm:grid-cols-2 sm:gap-6 mb-10"
      >
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Save your generated rooms
        </li>

        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Get more room styles and room types
        </li>

        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Premium support by email
        </li>

        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Ability to request features
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Commercial usage of photos
        </li>
        <li className="flex gap-x-3">
          <svg
            className="h-6 w-5 flex-none text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
          Early access to new features
        </li>
      </ul>
      <Footer />
    </div>
  );
}
