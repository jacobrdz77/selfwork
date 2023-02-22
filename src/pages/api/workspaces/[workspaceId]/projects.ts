import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

//Endpoint: /api/workspaces/:workspaceId/projects
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects from workspaceId
  if (req.method === "GET") {
    try {
      const { workspaceId, sections } = req.query;
      // For Development
      if (!workspaceId) {
        throw new Error("Provide a workspaceId.");
      }

      const projects = await prisma.project.findMany({
        where: {
          workspaceId: workspaceId as string,
        },
        include: {
          sections: sections === "true" ? true : false,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return res.status(200).json(projects);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
