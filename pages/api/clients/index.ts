import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get all clients
  //RETURNS: array of clietns
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const clients = await prisma.client.findMany({
      where: {
        userId: req.body.userId,
      },
    });
    res.status(200).json(clients);
  }

  //Create a new client
  //RETURNS: the new client
  else if (req.method === "POST") {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const client = await prisma.client.create({
      data: {
        ...req.body.client,
      },
    });
    res.status(200).json(client);
  }

  // Delete a client
  // RETURNS: the deleted client
  else if (req.method === "DELETE") {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const client = await prisma.client.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(client);
  } else {
    res.status(400).json({ error: "Request Not Allowed" });
  }
}
