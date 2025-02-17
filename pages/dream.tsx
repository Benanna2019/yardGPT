import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import useSWR from "swr";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../components/compareslider";
import Footer from "../components/footer";
import Header from "../components/header";
import LoadingDots from "../components/loadingdots";
import ResizablePanel from "../components/resizablepanel";
import Toggle from "../components/toggle";
import appendNewToName from "../utils/appendnewtoname";
import downloadPhoto from "../utils/downloadphoto";
import DropDown from "../components/dropdown";
import { yardType, yards, themeType, themes } from "../utils/dropdowntypes";
import { Rings } from "react-loader-spinner";
import { GenerateResponseData } from "./api/generate";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Family Garden");
  const [yard, setYard] = useState<yardType>("Japanese Zen");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/remaining", fetcher);
  const { data: session, status } = useSession();

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: {
      colors: {
        primary: "#000", // Primary buttons & links
        error: "#d23f4d", // Error messages
        shade100: "#000", // Standard text
        shade200: "#000e", // Secondary button text
        shade300: "#000d", // Secondary button text (hover)
        shade400: "#000c", // Welcome text
        shade500: "#0009", // Modal close button
        shade600: "#0007", // Border
        shade700: "#fff2", // Progress indicator background
        shade800: "#fff1", // File item background
        shade900: "#ffff", // Various (draggable crop buttons, etc.)
      },
    },
    onValidate: async (file: File): Promise<undefined | string> => {
      return data.remainingGenerations === 0
        ? `No more credits left. Buy more above.`
        : undefined;
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          // TODO: Make sure these are the image dimensions we want
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
          generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, yard }),
    });

    let response = (await res.json()) as GenerateResponseData;
    if (res.status !== 200) {
      setError(response as any);
    } else {
      mutate();
      const yards =
        (JSON.parse(localStorage.getItem("yards") || "[]") as string[]) || [];
      yards.push(response.id);
      localStorage.setItem("yards", JSON.stringify(yards));
      setRestoredImage(response.generated);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const router = useRouter();

  useEffect(() => {
    if (router.query.success === "true") {
      toast.success("Payment successful!");
    }
  }, [router.query.success]);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <Head>
        <title>YardGPT</title>
      </Head>
      <Header
        photo={session?.user?.image || undefined}
        email={session?.user?.email || undefined}
      />
      <main className="mt-4 mb-8 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mb-0">
        {status === "authenticated" ? (
          <Link
            href="/get-credits"
            className="my-6 rounded-2xl border border-gray-700 py-2 px-4 text-sm text-gray-900 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800"
          >
            Pricing is now available.{" "}
            <span className="font-semibold text-gray-900">Click here</span> to
            buy credits!
          </Link>
        ) : (
          <h3 className="my-6 rounded-2xl border border-gray-700 py-2 px-4 text-sm text-gray-900 transition duration-300 ease-in-out hover:text-gray-800">
            Redisign your yard, garden, and exterior spaces with YardGPT.{" "}
          </h3>
        )}
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl">
          Generate your <span className="text-emerald-600">dream</span> yard
        </h1>
        {status === "authenticated" && data && !restoredImage && (
          <p className="text-gray-800">
            You have{" "}
            <span className="font-semibold text-gray-700 underline">
              {data.remainingGenerations}{" "}
              {data?.remainingGenerations > 1 ? "credits" : "credit"}
            </span>{" "}
            left.{" "}
            {data.remainingGenerations < 2 && (
              <span>
                Buy more credits{" "}
                <Link
                  href="/buy-credits"
                  className="font-semibold text-gray-900 underline underline-offset-2 transition hover:text-gray-800"
                >
                  here
                </Link>
                .
              </span>
            )}
          </p>
        )}
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="mt-4 flex w-full flex-col items-center justify-between">
              {restoredImage && (
                <div>
                  Here's your remodeled <b>{yard.toLowerCase()}</b> in the{" "}
                  <b>{theme.toLowerCase()}</b> theme!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {status === "loading" ? (
                <div className="flex h-[250px] max-w-[670px] items-center justify-center">
                  <Rings
                    height="100"
                    width="100"
                    color="white"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
              ) : status === "authenticated" && !originalPhoto ? (
                <>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="mt-3 flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900">
                        <RiNumber1 />
                      </div>
                      <p className="text-left font-medium">
                        Choose your yard theme.
                      </p>
                    </div>
                    <DropDown
                      theme={theme}
                      // @ts-ignore
                      setTheme={(newTheme) => setTheme(newTheme)}
                      themes={themes}
                    />
                  </div>
                  <div className="w-full max-w-sm space-y-4">
                    <div className="mt-10 flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900">
                        <RiNumber2 />
                      </div>
                      <p className="text-left font-medium">
                        Choose your yard type.
                      </p>
                    </div>
                    <DropDown
                      theme={yard}
                      // @ts-ignore
                      setTheme={(newYard) => setYard(newYard)}
                      themes={yards}
                    />
                  </div>
                  <div className="mt-4 w-full max-w-sm">
                    <div className="mt-6 flex w-96 items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900">
                        <RiNumber3 />
                      </div>
                      <p className="text-left font-medium">
                        Upload a picture of your yard.
                      </p>
                    </div>
                  </div>
                  <UploadDropZone />
                </>
              ) : (
                !originalPhoto && (
                  <div className="-mt-8 flex h-[250px] max-w-[670px] flex-col items-center space-y-6">
                    <div className="max-w-xl text-gray-900">
                      Sign in below with Google to create a free account and
                      redesign your yard today. You will get 3 generations for
                      free.
                    </div>
                    <button
                      onClick={() => signIn("google")}
                      className="flex items-center space-x-2 rounded-2xl bg-gray-200 py-3 px-6 font-semibold text-black"
                    >
                      <Image
                        src="/google.png"
                        width={20}
                        height={20}
                        alt="google's logo"
                      />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                )
              )}
              {originalPhoto && !restoredImage && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="h-96 rounded-2xl"
                  width={475}
                  height={475}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div>
                    <h2 className="mb-1 text-lg font-medium">
                      Original Yard/Design
                    </h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="relative h-96 w-full rounded-2xl"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="mt-8 sm:mt-0">
                    <h2 className="mb-1 text-lg font-medium">
                      Generated Yard/Design
                    </h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={restoredImage}
                        className="relative mt-2 h-96 w-full cursor-zoom-in rounded-2xl sm:mt-0"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="mt-8 w-40 rounded-full bg-blue-500 px-4 pt-2 pb-3 font-medium text-white"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="mt-8 max-w-[575px] rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
                    Please try again later.
                  </div>
                  <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    {error}
                  </div>
                </div>
              )}
              <div className="flex justify-center space-x-2">
                {originalPhoto && !loading && !error && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="mt-8 rounded-full bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-500/80"
                  >
                    Generate New Yard
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="mt-8 rounded-full border bg-white px-4 py-2 font-medium text-black transition hover:bg-gray-100"
                  >
                    Download Generated Yard
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
