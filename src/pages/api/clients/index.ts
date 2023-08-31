import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma/client";
import { Client } from "@prisma/client";

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
        include: {
          projects: true,
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
      const { client }: { client: Client } = JSON.parse(req.body);
      console.log("Client: ", client);
      const clientData = {
        name: client.name,
        email: client.email,
        phone: client.phone,
        companyName: client.companyName,
        businessAddress: client.businessAddress,
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
