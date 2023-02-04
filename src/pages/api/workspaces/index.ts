import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../prisma/client";

//Endpoint: /api/workspaces
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all workspaces from the ownerId provided
  if (req.method === "GET") {
    try {
      // Future
      // Todo: get the ownerId FROM session
      const { ownerId } = req.query;

      if (!ownerId) {
        throw new Error("Provide a ownerId.");
      }

      const workspaces = await prisma.workspace.findMany({
        where: {
          ownerId: ownerId as string,
        },
      });

      return res.status(200).json(workspaces);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new workspace
  if (req.method === "POST") {
    try {
      /*
        Frontend needs to provide:
        {
          workspaceData: {
            name: "Company name or Team name",
            ownerId: "iadj18929nbvlseow"  //! When auth is implemented, get id from session
          }
        }
      */
      const { workspaceData } = req.body;

      // Create a new workspace and makes the owner a member.
      const newWorkspace = await prisma.workspace.create({
        data: {
          name: workspaceData.name,
          owner: {
            connect: {
              id: workspaceData.ownerId,
            },
          },
          members: {
            connect: {
              id: workspaceData.ownerId,
            },
          },
        },
      });

      return res.status(200).json(newWorkspace);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
