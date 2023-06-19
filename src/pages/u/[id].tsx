/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PhotoCard } from "../../components/photoCard";
import { StarIcon } from "@heroicons/react/24/solid";
import { getUserAndPosts } from "~/utils/ipfs";
import { ENS } from '@ensdomains/ensjs'
import { ethers } from 'ethers'
import type { Post } from "../post/[id]";

export interface User {
  id: string;
  name: string;
  bio: string;
  email?: string;
  image: string;
  bannerImage: string;
  createdAt: string;
  posts: Post[];
}

export async function getServerSideProps(context) {
  const id = context?.query?.id as string;

  const user = await getUserAndPosts(id);
  let profile;
  try{
    const ENSInstance = new ENS()

    const provider = new ethers.JsonRpcProvider()
    await ENSInstance.setProvider(provider)
    profile = await ENSInstance.getProfile(
      user.addressETH,
    )
  }
  catch(e){
    console.log(e)
  }


  
  
  // @Daniel need to return postedDate in this format instead of how it currently is
  // const serializedPost = {
  //     ...post,
  //     postedDate: post.postedDate.toJSON(), // Convert to JSON string
  //   };
  return {
    props: {
      user,
      userENS: profile ?? null
    },
  };
}

type Props = {
  user: User;
};

const UserPage = (props: Props) => {
  
  const { user, userENS } = props;
  
  if(!user.id){
    return <div className="flex grow h-full justify-center items-center">
      not found
    </div>
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex h-full flex-col items-start justify-start gap-12 px-4 py-16 sm:flex-row">
        <div className="sticky top-12 flex flex-col gap-4">
          <div className="flex w-full max-w-xs flex-col bg-pink-200 p-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-black sm:text-[2rem]">
              {user.name}
            </h2>
            <p className="mt-2 text-sm text-black">{user.bio}</p>
            <p className="text-black-300 mt-2 text-sm">
              Member since: {user.createdAt}
            </p>u/1
            <div className="flex flex-row">
              <button className="flex flex-row bg-green-200">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-xs flex-col bg-sky-200 p-5">
            <p className="text-black-300 mt-2 text-sm">
              Check out my sweet cat
            </p>
          </div>
        </div>
        <div className="flex h-full max-h-full w-full flex-row flex-wrap gap-2 overflow-y-scroll bg-blue-200 p-5">
          {user?.posts?.map((post, index) => (
            <PhotoCard key={index} card={{
              id: post.id,
              title: post.title,
              content: post.content,
              content_preview: post.content_preview,
              image_preview: post.image_preview,
              createdAt: post.createdAt,
              userId: post.authorId,
              image: post.images,
              updatedAt: post.updateAt
            }}/>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserPage;
