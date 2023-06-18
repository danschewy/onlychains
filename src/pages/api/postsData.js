// import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const items = [];

export default async function handler(req, res) {
  await new Promise((r) => setTimeout(r, 1000)); // is this optional
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany({
         take: 10,
        orderBy: [
          {
            postedDate: "desc",
          },
        ],
      });
      return res.json({
        ts: Date.now(),
        items,
        // count: items.length,
        posts,
      });
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  if (req.method === "POST" && req.query.action == "delete") {
    console.log(req.query);
    // Confirm owner 

    try {
      // Use Prisma to delete the record
      const deletedRecord = await prisma.post.delete({
        where: {
          id: parseInt(req.query.postId),
        },
      });
      res.status(200).json(deletedRecord);
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  }

  if (req.method === "POST" && req.query.action != "delete") {
    const { title, author_name, content, image } = req.body;
    
    const body = req.body
  console.log('body: ', body)

  // Both of these are required.
  if (!body.title || !body.content) {
    return res.json({ data: 'First or last name not found' })
  }

  // Test return
  res.json({ data: `${body.first} ${body.last}` })
    
    const nonce = uuidv4();
    const newTodo = {
      id: Math.random().toString(),
      title: title,
      author_name: author_name,
      content: content,
      content_preview: content_preview,
      images: image,
      image_author,
      userId: userId,
      postedDate: new Date().toISOString(),
      nonce,
    };
    // Local optimistic update
    items.push(newTodo);
    try {
      // Push to DB
      await prisma.post.create({
        data: {
          title: title,
          author_name: author_name,
          content,
          content_preview,
          images,
          userId,
          image_author,
          postedDate: new Date().toISOString(),
          nonce,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Could not add item!" });
    }
    return res.status(201).json();
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
