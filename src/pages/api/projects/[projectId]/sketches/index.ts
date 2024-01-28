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
        select: {
          id: true,
          projectId: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          elements: false,
          project: false,
        },
      });

      return res.status(200).json(projectSketches);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
