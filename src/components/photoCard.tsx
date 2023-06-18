import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Image from "next/image";

export interface PhotoCard {
  id: number;
  title: string;
  content: string;
  content_preview: string;
  image_preview: string;
  postedDate: Date;
  userId: string;
  image: string; // DB stores Array of strings
  image_author: string;
  author_name: string;
  updatedAt: Date;
}
export const PhotoCard: React.FC<{ card: PhotoCard }> = ({ card }) => {
    // const mockPhoto = {
  //   id: "1",
  //   description: "Sexy text",
  //   image: "https://placekitten.com/50/100",
  //   createdAt: "2021-10-10T00:00:00.000Z",
  // };

  // return (
  //   <div className="flex h-64 w-44 max-w-md flex-col rounded-md bg-gradient-to-b from-blue-300 to-pink-300 p-2 dark:from-blue-800 dark:to-purple-800 ">
  //     <img
  //       src={mockPhoto.image}
  //       alt={mockPhoto.description}
  //       className="overflow-hidden"
  //     />

  //     <div className="mt-8 flex items-center gap-4">
  //       <div>{mockPhoto.description}</div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-sm lg:flex lg:max-w-full">
      <div
        className="h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
       style={{
    backgroundImage: `url(${card?.image || 'https://placekitten.com/200/300'})`,
  }}
      ></div>
      <div className="flex flex-col justify-between rounded-b border-b border-l border-r border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400">
        <div className="mb-8">
          <p className="flex items-center text-sm text-gray-600">
            <svg
              className="mr-2 h-3 w-3 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="mb-2 text-xl font-bold text-gray-900">
            {card?.title || ""}
          </div>
          <p className="text-base text-gray-700">
          {card?.content || ''}
          </p>
        </div>
        <div className="flex items-center">
          {/* <img
            className="mr-4 h-10 w-10 rounded-full"
            src="https://placekitten.com/200/300"
            alt="Avatar of Jonathan Reinink"
          /> */}
          <Link href="`users/${card.userId}`">
            <Image
            className="mr-4 h-10 w-10 rounded-full"
            // src={card.image_author}
            src={`${card?.image || 'https://placekitten.com/200/300'}`}
            alt="Author Avatar"
            width={50}
            height={50}
          />
          <div className="text-sm">
            <p className="leading-none text-gray-900">{card?.author_name || 'Admin'}</p>
            <p className="text-gray-600">{format(
                        parseISO(card.postedDate),
                        "MMMM dd, yyyy HH:MM"
                      )}</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
