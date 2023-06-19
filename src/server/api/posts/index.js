import { prisma } from '../../../prisma/client'

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      take: 10,
      skip: 1,
      orderBy: {
        postedDate: 'desc',
      },
    })
    
    res.json(posts)
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed' });
  }
}
