import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Get all clients
  if (req.method === "GET") {
    try {
      const { userId } = req.body;
      const clients = await prisma.client.findMany({
        where: {
          userId: userId as string,
        },
      });
      return res.status(200).json(clients);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  //Create a new client
  if (req.method === "POST") {
    try {
      const { client } = req.body;
      const clientData = {
        name: client.name,
        description: client.description,
        email: client.email,
        phone: client.phone,
        businessAddress: client.address,
        website: client.website,
        user: {
          connect: {
            id: client.userId,
          },
        },
      };
      const newClient = await prisma.client.create({
        data: clientData,
      });
      return res.status(200).json(newClient);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
