import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all project sketches
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;

      const projectSketches = await prisma.sketch.findMany({
        where: {
          projectId: projectId as string,
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return res.status(200).json(projectSketches);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
