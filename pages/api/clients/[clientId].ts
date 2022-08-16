import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({
      message: "Method not allowed",
    });
  }

  // Finds unique client
  const prisma = new PrismaClient();
  const client = await prisma.client.findUnique({
    where: {
      id: req.query.clientId as string,
    },
  });
  res.status(200).json(client);
}
