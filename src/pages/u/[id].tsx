/* eslint-disable @next/next/no-img-element */
import React from "react";
import { PhotoCard } from "../../components/photoCard";
import { StarIcon } from "@heroicons/react/24/solid";

export interface User {
  id: string;
  name: string;
  bio: string;
  email?: string;
  image: string;
  bannerImage: string;
  createdAt: string;
}

export const getServerSideProps = async () => {
  const mockUser = {
    id: "1",
    name: "John Doe",
    bio: "I am a person",
    image: "https://placekitten.com/200/300",
    bannerImage: "https://placekitten.com/700/300",
    createdAt: "2021-10-10T00:00:00.000Z",
  };

  return {
    props: {
      user: mockUser,
    },
  };
};

type Props = {
  user: User;
};

const UserPage = (props: Props) => {
  const { user } = props;
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
            </p>
            <div className="flex flex-row">
              <button className="flex flex-row bg-green-200">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex w-full max-w-xs flex-col bg-sky-200 p-5">
            <p className="text-black-300 mt-2 text-sm">
              Check out my sweet possy
            </p>
          </div>
        </div>
        <div className="flex h-full max-h-full w-full flex-row flex-wrap gap-2 overflow-y-scroll bg-blue-200 p-5">
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
          <PhotoCard />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
