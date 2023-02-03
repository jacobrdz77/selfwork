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
      const { workspaceId } = req.query;

      const workspaceWithMembers = await prisma.workspace.findUnique({
        where: {
          id: workspaceId as string,
        },
        select: {
          owner: true,
          members: true,
        },
      });

      const members = [
        workspaceWithMembers!["owner"],
        ...workspaceWithMembers!["members"],
      ];
      return res.status(200).json(members);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
