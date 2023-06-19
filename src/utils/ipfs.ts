import { create } from "ipfs-http-client";
import { encrypt } from "./encryption";
import { prisma } from "~/server/db";

export const ipfs = create({
  host: "127.0.0.1",
  port: 5001,
  protocol: "http",
});

// This function uploads a file to IPFS and returns the CID
export async function uploadToIPFS(filePath: string): Promise<boolean> {
  try {
    // connect to the IPFS API server
    try {
      // Ping the IPFS node
      await ipfs.id();
    } catch (error) {
      throw error;
    }
    // read the file
    const file = await (await fetch(filePath)).blob();
    const fileText = await file.text();
    // const encryptedContent = encrypt(fileText);

    // convert the file to a format that can be uploaded to IPFS
    const newId = crypto.randomUUID();
    const fileName = "/" + newId + ".jpeg";

    // upload the file
    await ipfs.files.write(fileName, fileText, {
      create: true,
    });

    // return the CID
    return true;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function getImages() {
  try {
    // connect to the IPFS API server
    try {
      // Ping the IPFS node
      await ipfs.id();
    } catch (error) {
      throw error;
    }

    const result = ipfs.files.ls("/");

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  const users = (await prisma.user.findMany()).map((user) => {
    return {
      ...user,
      createdAt: null,
      updatedAt: null,
    };
  });
  return users;
}

export async function getUserAndPosts(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
    },
  });
  return {
    ...user,
    createdAt: null,
    updatedAt: null,
    posts:
      user?.posts?.map((post) => {
        return { ...post, postedDate: null };
      }) ?? null,
  };
}
