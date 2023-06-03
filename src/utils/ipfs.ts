// Import necessary modules
import fs from "fs";
import { create } from "ipfs-http-client";

// export interface Options {
//     host?: string
//     port?: number
//     protocol?: string
//     headers?: Headers | Record<string, string>
//     timeout?: number | string
//     apiPath?: string
//     url?: URL|string|Multiaddr
//     ipld?: Partial<IPLDOptions>
//     agent?: HttpAgent | HttpsAgent
//   }

// This function uploads a file to IPFS and returns the CID
export async function uploadToIPFS(filePath: string): Promise<string> {
  try {
    // connect to the IPFS API server
    const ipfs = create();
    console.log(
      "************************************created ipfs client",
      filePath
    );
    console.log("************************************is online2");
    // read the file
    const file = await (await fetch(filePath)).blob();

    console.log("fetched file", filePath);

    // convert the file to a format that can be uploaded to IPFS
    const fileForIpfs = { path: crypto.randomUUID(), content: file };

    // upload the file
    const result = await ipfs.files.write("./", file);
    console.log("added file", result);

    // return the CID
    return "yay";
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
