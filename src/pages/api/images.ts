import type { NextApiRequest, NextApiResponse } from "next";
import { ipfs } from "~/utils/ipfs";

// api handler for images ex. /images/<cid>
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cid = req.query.cid;
  console.log("here");
  // get the image from local ipfs
  try {
    await ipfs.id();
    const ipfsCat = ipfs.cat(cid as string);
    const imageBuffer = [];
    for await (const chunk of ipfsCat) {
      imageBuffer.push(chunk);
    }
    res.setHeader("Content-Type", "image/jpeg");
    res.end(Buffer.concat(imageBuffer));
  } catch (error) {
    console.error("***Failed to connect to IPFS:", error);
    throw error;
  }
}
