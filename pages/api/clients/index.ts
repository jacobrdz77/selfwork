import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const clients = await prisma.client.findMany({
      where: {
        //@ts-ignore
        userId: req.body.userId,
      },
    });
    res.status(200).json(clients);
  }
}
