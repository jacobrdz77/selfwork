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

      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId as string,
        },
        select: {
          members: true,
        },
      });

      return res.status(200).json(workspace?.members);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
