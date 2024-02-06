import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET all links
  if (req.method === "GET") {
    if (req.query.projectId) {
      const links = await prisma.link.findMany({
        where: { projectId: req.query.projectId as string },
      });
      return res.status(200).json(links);
    }

    const links = await prisma.link.findMany();
    return res.status(200).json(links);
  }

  // Create a new link
  if (req.method === "POST") {
    try {
      const link = req.body;
      if (!link) {
        return res.status(400).json({ error: "Provide link data." });
      }

      const newLink = await prisma.link.create({
        data: {
          name: link.name,
          url: link.url,
          project: {
            connect: {
              id: link.projectId,
            },
          },
        },
      });

      return res.status(200).json(newLink);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
