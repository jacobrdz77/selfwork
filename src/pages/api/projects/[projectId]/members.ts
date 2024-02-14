import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

//Endpoint: /api/workspaces/:workspaceId/members
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all members
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;
      const projectMembers = await prisma.project.findUnique({
        where: {
          id: projectId as string,
        },
        select: {
          members: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      if (!projectMembers) {
        return res
          .status(404)
          .json({ error: `Project ${projectId} not found.` });
      }

      return res.status(200).json(projectMembers);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
