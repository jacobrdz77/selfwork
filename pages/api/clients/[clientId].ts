import { prisma } from "../../../src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

    //Get all clients
  //RETURNS: array of clients
  else if (req.method === "GET") {
    const { userId } = req.query;
    const clients = await prisma.client.findMany({
      where: {
        userId: req.body.userId,
      },
    });
    return res.status(200).json(clients);
  }

  // Finds unique client
  const client = await prisma.client.findUnique({
    where: {
      id: req.query.clientId as string,
    },
  });
  return res.status(200).json(client);
}
