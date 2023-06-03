import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import type { OurFileRouter } from "~/server/uploadthing";
// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import Image from "next/image";

export default function Home() {
  const [files, setFiles] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {files?.map((file) => (
        <Image key={file.fileKey} src={file.fileUrl} alt="" fill />
      ))}
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFiles(res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
