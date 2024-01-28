import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

//Endpoint: /api/workspaces/:workspaceId
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //* WORKS
  // GET one workspace
  // RETURN: a workspace
  if (req.method === "GET") {
    try {
      const { workspaceId, with_projects } = req.query;

      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId as string,
        },
        include: {
          members: true,
          owner: true,
          projects: false,
        },
      });

      if (!workspace) {
        return res
          .status(404)
          .json({ error: `Workspace ${workspaceId} not found.` });
      }

      if (with_projects === "true") {
        const workspace = await prisma.workspace.findUnique({
          where: {
            id: workspaceId as string,
          },
          include: {
            members: true,
            owner: true,
            projects: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        });

        return res.status(200).json(workspace);
      }

      return res.status(200).json(workspace);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  //* WORKS
  // DELETE a workspace
  // RETURN: the deleted workspace
  else if (req.method === "DELETE") {
    try {
      const { workspaceId, ownerId } = req.query;
      const workspaces = await prisma.workspace.findMany({
        where: {
          ownerId: ownerId as string,
        },
      });
      if (workspaces.length === 1) {
        return res.status(403).json({
          error:
            "Cannot delete your only workspace. Create another new one and try again.",
        });
      }
      const workspace = await prisma.workspace.delete({
        where: {
          id: workspaceId as string,
        },
      });
      return res.status(200).json({ workspace, message: "DELETED workspace" });
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Future:
  //// Todo: Connect a member to a workspace
  // UPDATE a workspace
  // RETURN: the updated workspace
  else if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);
      const { workspaceData } = body;
      const { workspaceId } = req.query;

      const workspace = await prisma.workspace.update({
        where: {
          id: workspaceId as string,
        },
        data: {
          ...workspaceData,
        },
      });
      return res.status(200).json(workspace);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
