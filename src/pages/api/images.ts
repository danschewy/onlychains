import type { NextApiRequest, NextApiResponse } from "next";
import { ipfs } from "~/utils/ipfs";

// api handler for images ex. /images/<cid>
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cid = req.query.cid;
  // get the image from local ipfs
  try {
    await ipfs.id();
    const ipfsCat = ipfs.cat(cid as string);
    const imageBuffer = [];
    for await (const chunk of ipfsCat) {
      imageBuffer.push(chunk);
    }
    let decryptedImage;
    try{
      decryptedImage =  Buffer.concat(imageBuffer);

    } catch (error) {
      decryptedImage = Buffer.concat(imageBuffer);
    }

    res.setHeader("Content-Type", "image/jpeg");
    res.end(decryptedImage);
  } catch (error) {
    console.error("***Failed to connect to IPFS:", error);
    throw error;
  }
}
