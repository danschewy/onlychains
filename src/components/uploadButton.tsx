import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import type { OurFileRouter } from "~/server/uploadthing";
import "@uploadthing/react/styles.css";

export const MyUploadButton = () => {
  const [files, setFiles] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >([]);

  return (
    <section>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          setFiles(res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
        }}
      />
    </section>
  );
};
