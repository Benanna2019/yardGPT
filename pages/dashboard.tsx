import Head from "next/head";
import Header from "../components/header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Footer from "../components/footer";
import prisma from "../lib/db";
import { Yard } from "@prisma/client";
import { YardGenerator } from "../components/yardgenerator";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import * as React from "react";

export default function Dashboard({ yards }: { yards: Yard[] }) {
  const session = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Head>
        <title>YardGPT Design Dashboard</title>
      </Head>
      <Header />
      <main className="mt-12 mb-8 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mb-0">
        {/* <h1 className="font-display mx-auto mb-5 max-w-4xl text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
          You should be on this page
        </h1> */}
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
          View your <span className="text-blue-600">yard designs</span>
        </h1>
        {yards.length === 0 ? (
          <p className="text-gray-900">
            You have no design generations. Generate one{" "}
            <Link
              href="/dream"
              className="text-blue-600 underline underline-offset-2"
            >
              here
            </Link>
          </p>
        ) : (
          <p className="text-gray-900">
            Browse through your previous yard generations below. Any feedback?
            Email ben@yardgpt.design
          </p>
        )}
        {yards.map((yard) => (
          <YardGenerator
            original={yard.inputImage}
            generated={yard.outputImage}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user) {
    return { props: { yards: [] } };
  }

  let yards = await prisma.yard.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    select: {
      inputImage: true,
      outputImage: true,
    },
  });

  return {
    props: {
      yards,
    },
  };
}
