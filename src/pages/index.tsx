import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { MyUploadButton } from "~/components/uploadButton";

import { api } from "~/utils/api";
import { getImages } from "~/utils/ipfs";

export const getServerSideProps = async () => {
  const asyncImageIterator = await getImages();
  const result = [];
  for await (const item of asyncImageIterator) {
    result.push(item.cid.toString());
  }
  return {
    props: {
      images: result,
    },
  };
};

const Home = ({
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Only<span className="text-[hsl(280,100%,70%)]">Chains</span>
          </h1>
          <div className="flex h-full w-full flex-wrap justify-around bg-red-200 md:flex-row">
            <div className="flex h-full w-3/5 flex-col bg-slate-300 p-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
                Your Feed
              </h2>
              <br />
              <div className="flex flex-wrap gap-4">
                {images?.map((image) => {
                  const url = "/api/images/?cid=" + image;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Link href={url} key={url} target="_blank">
                      <img src={url} alt="" className="h-32" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex h-full w-2/5 flex-col bg-blue-200 p-5">
              <MyUploadButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
