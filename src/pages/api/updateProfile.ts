import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { ethers } from "ethers";

const prisma = new PrismaClient();
const items = [];

// Handler for creating a new comment
export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("updating", req.body);
    const { gender, bio, displayName, addressETH } = req.body;

    //    const session = await getSession(context);
    // const token = await getToken({ req: context.req });

    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    try {
      // Push to DB
      const user = await prisma.user.findFirst({
        where: {
          addressETH: addressETH,
        },
      });
      if (!user) {
        await prisma.user.create({
          data: {
            gender,
            bio,
            displayName,
            addressETH,
          },
        });
      } else {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            ...user,
            gender,
            bio,
            displayName,
          },
        });
      }

      console.log("updated ", addressETH);

      return res.status(201).json();
    } catch (error) {
      console.error("Error updating user", error);
      res.status(500).json({ error: "Could not update user!" });
    }

    // Perform validation or other checks
  }
  //   if (req.method === "PUT") {
  //     const { postId, content, userId, authorDisplayName, commentId } = req.body;
  //     if (!userId) {
  //       return res.status(401).json({ error: "Unauthorized" });
  //     }

  //     // const nonce = uuidv4();
  //     // const newComment = {
  //     //   id: Math.random().toString(),
  //     //   userId: userId,
  //     //   authorDisplayName: authorDisplayName,
  //     //   postId: postId,
  //     //   content: content,
  //     //   createdAt: new Date().toISOString(),
  //     //   nonce,
  //     // };
  //     // items.push(newComment);
  //     try {
  //       // Push to DB
  //       await prisma.comment.update({
  //         where: {
  //           id: commentId.toString(),
  //         },
  //         data: {
  //           content: content,
  //           userId: userId,
  //           updatedAt: new Date().toISOString(),
  //           // nonce,
  //         },
  //       });
  //       return res.status(200).json();
  //     } catch (error) {
  //       console.error("Error creating comment:", error);
  //       res.status(500).json({ error: "Could not add comment!" });
  //     }
  //   }
  // Perform validation or other checks

  // Save the comment to the database using Prisma
  // try {
  //   const comment = await prisma.comment.create({
  //     data: { postId, userId: session.user.id, content },
  //   });

  //   // Send the response
  //   res.status(201).json(comment);
  // } catch (error) {
  //   console.error("Error creating comment:", error);
  //   res.status(500).json({ error: "Failed to create comment" });
  // }
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
