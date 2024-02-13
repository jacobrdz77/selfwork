import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;

      const inviteesEmails = await prisma.inviteLink.findMany({
        where: {
          projectId: projectId as string,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return res.status(200).json(inviteesEmails);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
