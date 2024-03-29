/** server/uploadthing.ts */
import type { NextApiRequest, NextApiResponse } from "next";
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { uploadToIPFS } from "~/utils/ipfs";

const f = createUploadthing();

const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware((req, res) => {
      // This code runs on your server before upload
      const user = auth(req, res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      await uploadToIPFS(file.url)
        .then((cid) => {
          console.log("Successfully uploaded to IPFS: ", cid);
        })
        .catch((error) => {
          console.error("Error uploading to IPFS: ", error);
        });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
