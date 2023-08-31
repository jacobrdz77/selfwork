import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import prisma from "../../../libs/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Creates InviteLink and sends it to email.
  if (req.method === "POST") {
    try {
      // PARSE
      const body = JSON.parse(req.body);
      const { inviteLink } = body;

      console.log("LINK: ", inviteLink);

      // Validate incoming body
      const linkSchema = z.object({
        email: z.string().email(),
        workspaceId: z.string().optional(),
        projectId: z.string().optional(),
      });

      const validInviteLink = linkSchema.parse(inviteLink);

      const generatedExpirationDate = new Date();
      generatedExpirationDate.setDate(generatedExpirationDate.getDate() + 1);

      if (validInviteLink.projectId) {
        // Create a invite to Project
        const generatedLink = await prisma.inviteLink.create({
          data: {
            expirationDate: generatedExpirationDate,
            project: {
              connect: {
                id: validInviteLink.projectId,
              },
            },
          },
        });

        // Todo: Send email with InviteLink

        return res.status(200).json({
          message: `Link sent to ${validInviteLink.email} `,
          generatedLink,
        });
      } else if (validInviteLink.workspaceId) {
        // Create a invite to Workspace
        const generatedLink = await prisma.inviteLink.create({
          data: {
            expirationDate: generatedExpirationDate,
            workspace: {
              connect: {
                id: validInviteLink.workspaceId,
              },
            },
          },
        });

        // Todo: Send email with InviteLink

        return res.status(200).json({
          message: `Link sent to ${validInviteLink.email} `,
          generatedLink,
        });
      } else {
        res.status(400).json({
          error: "Please include projectId or workspaceId to create link.",
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ error: error });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
