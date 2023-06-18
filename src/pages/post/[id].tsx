/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @next/next/no-img-element */
import React from "react";
// import { PhotoCard } from "../../components/photoCard";
import { StarIcon } from "@heroicons/react/24/solid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { format, parseISO } from "date-fns";
import Image from "next/image";

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export interface User {
  id: string;
  name: string;
  bio: string;
  email?: string;
  image: string;
  bannerImage: string;
  createdAt: string;
}
export interface Post {
  id: number;
  title: string;
  content: string;
  updateAt: Date;
  images: string[];
  postedDate: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const session = await getSession(context);
  const token = await getToken({ req: context.req });

  const address = token?.sub ?? null;
  // If you have a value for "address" here, your
  // server knows the user is authenticated.
  const { id } = context.params; // get ID from URL
  const IdInt = parseInt(id);

  const post = await prisma.post.findUnique({
    where: {
      id: IdInt,
    },
    include: {
      author: true,
      Payment: true,
      _count: true,
      // title: true,
      // content: true,
      // imagePreview: true,
      // updatedAt: true,
    }
})
// console.log("Post", post);
   const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: { // Include user's posts
      posts: true,
    },
  });
  console.log("User", user);

  if (!user) {
    return {
      notFound: true,
    };
  }
  
  // This ensures that the props will be serializable (JSON.stringify-able)
const userWithPosts = JSON.parse(JSON.stringify(user));
const postWithUser = JSON.parse(JSON.stringify(post));

return {
  props: {
    user: userWithPosts,
    post: postWithUser,
    address,
    session,
  },
};

}

// type AuthenticatedPageProps = InferGetServerSidePropsType<
//   typeof getServerSideProps
// >;

type Props = {
  user: User;
  post: Post;
};
// export function AuthenticatedPage({ address }: AuthenticatedPageProps) {
//   return address ? (
//     <h1>Authenticated as {address}</h1>
//   ) : (
//     <h1>Unauthenticated</h1>
//   );
// }

const UserPage = (props: Props) => {
  const { user } = props;
  const {post} = props;
  return (
    <main className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex h-full flex-col items-start justify-start gap-12 px-4 py-16 sm:flex-row">
        <div className="sticky top-12 flex flex-col gap-4">
          <div className="flex w-full max-w-xs flex-col bg-pink-200 p-5">
            <div className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none" >

            </div>
           <Image src={`${user['image'] || 'https://placekitten.com/200/300'}`} width={100} height={100}
      ></Image>
            <h2 className="text-2xl font-extrabold tracking-tight text-black sm:text-[2rem]">
              {user['displayName']} 
            </h2>
            <p className="mt-2 text-sm text-black"> {user['role']} </p>
            <p className="mt-2 text-sm text-black">{user['bio']}</p>

        
            <p className="text-black-300 mt-2 text-sm">
              Member since: {format(
                parseISO(user.createdAt),
                    "MMMM dd, yyyy HH:MM"
                  )}
            </p>
            <p className="text-black-300 mt-2 text-sm">
              Language: {user['language']}
              </p>
            <div className="flex flex-row">
              <button className="flex flex-row bg-green-200">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-xs flex-col bg-sky-200 p-5">
            {/* <p className="text-black-300 mt-2 text-sm">
              Check out my sweet possy
            </p> */}
          </div>
        </div>
        <div className="flex h-full max-h-full w-full flex-row flex-wrap gap-2 overflow-y-scroll bg-blue-200 p-5">
      
      {/* <p><AuthenticatedPage/></p> */}
      <p> {post.title}</p>
      
      <p> {post.content}</p>
     <p>  {post.postedDate}</p>
      <p> {post.images}</p>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
