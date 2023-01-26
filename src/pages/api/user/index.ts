import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user
  if (req.method === "GET") {
    try {
      const { userId } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      });
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
