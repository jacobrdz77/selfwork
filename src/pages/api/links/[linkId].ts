import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connects the user to project/workspace
  if (req.method === "GET") {
    try {
      const { linkId, userId } = req.query;
      const link = await prisma.inviteLink.findUnique({
        where: {
          id: linkId as string,
        },
      });

      if (!link) {
        return res.status(404).json({ error: `Invite link doesn't exist.` });
      }
      // Delete Link if it is expired.
      else if (link.expirationDate < new Date()) {
        console.log("DELETED LINK");
        // await prisma.inviteLink.delete({
        //   where: {
        //     id: linkId as string,
        //   },
        // });
        return res.status(400).json({ error: `Invite link expired` });
      }

      // Adds user to Project
      if (link.projectId) {
        const project = await prisma.project.update({
          where: {
            id: link.projectId,
          },
          data: {
            members: {
              connect: {
                id: userId as string,
              },
            },
          },
        });
        return res.status(200).json({
          message: `Added user to ${project.name} project!`,
        });
      }
      // Adds user to Workspace
      else if (link.workspaceId) {
        const workspace = await prisma.workspace.update({
          where: {
            id: link.workspaceId,
          },
          data: {
            members: {
              connect: {
                id: userId as string,
              },
            },
          },
        });

        return res.status(200).json({
          message: `Added user to ${workspace.name} workspace!`,
        });
      }

      return res.status(200).json(link);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a link
  // RETURN: the deleted link
  if (req.method === "DELETE") {
    try {
      const { linkId } = req.query;
      await prisma.inviteLink.delete({
        where: {
          id: linkId as string,
        },
      });

      return res.status(200).json({ message: "Invite link deleted." });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
