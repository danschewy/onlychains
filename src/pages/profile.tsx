// import { useSession } from "next-auth/react";
// import Layout from "../components/layout";
// import AccessDenied from "../components/access-denied";
// import Image from "next/image";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// // import type { Post } from "./post/[id]";
// // import { getUserAndPosts } from "~/utils/ipfs";
// // import { prisma } from "~/server/db";
// import { useRouter } from "next/router";
// import { useCallback, useMemo, useState, useEffect } from "react";
// import { useWalletClient } from "wagmi";
// impor

// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//   const token = await getToken({ req: context.req });

//   const address = token?.sub ?? null;

//   const user = await prisma.user.findUnique({
//     where: {

//       id
//       // addressETH: id
//     },
//   });
//   return {
//     ...user,
//     createdAt: null,
//     updatedAt: null,
//   };
//   }

// export default function ProtectedPage(props: Props) {
//   const { user } = props;
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
//   const [content, setContent] = useState();

//   const {
//     register,
//     watch,
//     handleSubmit,
//     control,
//     // watch,
//     formState: { errors },
//   } = useForm<IFormInput>({
//     reValidateMode: "onBlur",
//   });
//   const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

//   // console.log(watch("example")) // watch input value by passing the name of it


//   // If no session exists, display access denied message
//   if (!session) {
//     return (
//       <Layout>
//         <AccessDenied />
//       </Layout>
//     );
//   }

//   const isCreator = watch("isCreator");

//   // If session exists, display content
//   return (
//       <div>
//         <h2>My OnlyChains Profile</h2>
//         <p>Connected Wallet:{session.user.name}</p>
//         <p>Member since:</p>
//         <Image
//           src={session.user?.image}
//           width={128}
//           height={128}
//           alt="profile image"
//         />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name="displayName"
//             control={control}
//             rules={{
//               required: { value: true, message: "required" },
//               minLength: { value: 3, message: "min length is 3" },
//               maxLength: { value: 50, message: "max length is 50" },
//             }}
//             render={({ field: { onChange }, fieldState: { error } }) => {
//               return (
//                 <div>
//                   <label>Display Name</label>
//                   <input onChange={onChange} />
//                   {error && (
//                     <p role="alert" className="text-red-500">
//                       {error.message}
//                     </p>
//                   )}
//                 </div>
//               );
//             }}
//           />

//           <Controller
//             name="gender"
//             control={control}
//             defaultValue={GenderEnum.female}
//             rules={{
//               required: { value: true, message: "required" },
//             }}
//             render={({ field: { onChange }, fieldState: { error } }) => (
//               <div>
//                 <label>Gender</label>
//                 <select onChange={onChange}>
//                   <option value="female" selected>
//                     female
//                   </option>
//                   <option value="male">male</option>
//                   <option value="other">other</option>
//                 </select>
//                 {error && (
//                   <p role="alert" className="text-red-500">
//                     {error.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           />

//           <Controller
//             name="bio"
//             control={control}
//             rules={{
//               required: { value: true, message: "required" },
//               maxLength: { value: 300, message: "max length is 300" },
//             }}
//             render={({ field: { onChange }, fieldState: { error } }) => {
//               return (
//                 <div>
//                   <label>Bio</label>
//                   <input onChange={onChange} />
//                   {error && (
//                     <p role="alert" className="text-red-500">
//                       {error.message}
//                     </p>
//                   )}
//                 </div>
//               );
//             }}
//           />

//           <Controller
//             name="isCreator"
//             control={control}
//             defaultValue={false}
//             render={({ field: { onChange } }) => {
//               return (
//                 <label className="relative inline-flex cursor-pointer items-center">
//                   <input
//                     onChange={onChange}
//                     type="checkbox"
//                     value=""
//                     className="peer sr-only"
//                   />
//                   <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
//                   <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
//                     Creator
//                   </span>
//                 </label>
//               );
//             }}
//           />

//           {isCreator && (
//             <div>
//               <label>Pricing Tier List</label>
//               <div className="flex flex-row items-center justify-center">
//                 {Array(5).fill(0).map((_, index) => {
//                   return (
//                     <Controller
//                       key={index}
//                       name={`tier${index}`}
//                       control={control}
//                       render={({ field: { onChange } }) => {
//                         return (
//                           <div className="w-[100px]">
//                             <div>
//                               Tier {index + 1}
//                               <input placeholder={((index + 1) * 5).toString()} onChange={onChange} type="number"/>
//                               </div>
//                           </div>
//                         );
//                       }}
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//           <input type="submit" />
//         </form>
//       </div>
//   );
// }
