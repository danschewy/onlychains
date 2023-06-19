/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NoteModal from "~/components/note.modal";
import CreateNote from "../../notes/create.note";
import NoteItem from "../../notes/note.component";
import { PhotoCard } from "~/components/photoCard";
// import { api } from "~/utils/api";
    // import PostList from "../../components/PostList";
import Link from "next/link";


import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import CurrencyConverter from "./fxConvert";
const client = new QueryClient();


async function fetchPostsDB() {
  const res = await axios.get("/api/postsData");
  return res.data;
}

function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPostsDB });
}


const PostsFeed: NextPage = () => {
  const [openNoteModal, setOpenNoteModal] = useState(false);
  // const { data: notes } = api.getNotes.useQuery(
  //   { limit: 10, page: 1 },
  //   {
  //     staleTime: 5 * 1000,
  //     select: (data) => data.notes,
  //     onError(err) {
  //       toast(err.message, {
  //         type: "error",
  //         position: "top-right",
  //       });
  //     },
  //   }
  // );
  const [title, setTitle] = React.useState("");
  const [authorName, setAuthorName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [contentPreview, setContentPreview] = React.useState("");
  const [image, setImage] = React.useState("");
  const [imageAuthor, setImageAuthor] = React.useState("");
  const [userID, setUserID] = React.useState("");
  const [postedDate, setPostedDate] = React.useState("");
  const [nonce, setNonce] = React.useState("");
  // const { data: session, status } = useSession();

 const queryClient = useQueryClient();
  // const [title, setTitle] = React.useState("");

 const { isFetching, ...queryInfo } = usePosts();
//   const { data: session, status } = useSession();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo) =>
      // axios.post("/api/posts", {
      axios.post("/api/postsData", {
        title: newTodo.title,
        author: newTodo.author,
        content: newTodo.content,
        image: newTodo.image,
        tags: newTodo.tags,
        postedDate: newTodo.postedDate,
        nonce: newTodo.nonce,
      }),
    onMutate: async (newTodo) => {
      setTitle("");
      setAuthorName("");
      setContent("");
      setImage("");
      setPostedDate("");
      setNonce("");
      await queryClient.cancelQueries(["posts"]);

      const previousPosts = queryClient.getQueryData(["posts"]);

      if (previousPosts) {
        queryClient.setQueryData(["posts"], {
          ...previousPosts,
          items: [
            ...previousPosts.items,
            {
              id: Math.random().toString(),
              title: newTodo.title,
              author: newTodo.author,
              content: newTodo.content,
              image: newTodo.image,
              tags: newTodo.tags,
              postedDate: new Date().toLocaleString(),
              nonce: newTodo.nonce,
            },
          ],
        });
      }

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 div div-cols-[repeat(auto-fill,_320px)] gap-7">
        <div className="p-4 h-72 bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
          <div
            onClick={() => setOpenNoteModal(true)}
            className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
          >
            <i className="bx bx-plus"></i>
          </div>
          <h4
            onClick={() => setOpenNoteModal(true)}
            className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
          >
            Add new note
          </h4>
        </div>

         {/* {status === "authenticated" ? ( */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodoMutation.mutate({
              title,
              author,
              content,
              image,
              tags,
              postedDate,
              nonce,
            });
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            required={true}
          />
          <label htmlFor="content">Content</label>
          <input
            type="text"
            onChange={(event) => setContent(event.target.value)}
            value={content}
            required={true}
          />
          <label htmlFor="content_preview">Content Preview</label>
          <input
            type="text"
            onChange={(event) => setContentPreview(event.target.value)}
            value={contentPreview}
            required={true}
          />
          <label htmlFor="content_preview">Image Upload</label>
          <p>upload button</p>
          <label htmlFor="content_preview">Payment</label>
          <CurrencyConverter />
     

          <button type="submit" disabled={addTodoMutation.isLoading}>
            Create Post
          </button>
        </form>
      {/* ) : ( */}
        <Link href="/api/auth/signin">
          <div color="info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>
You must connect your wallet and prove your ownership to create a post
          
          </div>
        </Link>
      {/* )} */}
        
        {queryInfo.isSuccess && (
          <div>
              {queryInfo.data.items
                .filter(
                  (todo: { postedDate: any; }) =>
                    !queryInfo.data.posts.some(
                      (post: { postedDate: any; }) => post.postedDate === todo.postedDate
                    )
                )
                .map((todo) => (
                  <Link href={`#`} key={todo.id}>
                    <div>
                      <PhotoCard
                      key={todo.id}
                      card={todo}
                    />
                      <h5>L</h5>
                    </div>
                  </Link>
                ))}
              {queryInfo.data.posts.map((post) => (
                <div key={post.id}>
                  <Link href={`#`} key={post.id}>
                  {/* <Link href={`/post/${post.id}`} key={post.id}> */}
                    <PhotoCard
                      key={post.id}
                      card={post}
                    />
                  </Link>
                </div>
              ))}
                    </div>
        )}
        {queryInfo.isLoading && "Loading"}
        {queryInfo.error instanceof Error && queryInfo.error.message}
    </div>
        <NoteModal
          openNoteModal={openNoteModal}
          setOpenNoteModal={setOpenNoteModal}
        >
          <CreateNote setOpenNoteModal={setOpenNoteModal} />
        </NoteModal>
    </div>
  );
}

function Widgets() {
  return (
          <QueryClientProvider client={client}>
            <PostsFeed />
          </QueryClientProvider>
  );
}

export default Widgets;
