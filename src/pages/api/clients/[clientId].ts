import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get one Client
  if (req.method === "GET") {
    try {
      const { clientId } = req.query;
      const client = await prisma.client.findUnique({
        where: {
          id: clientId as string,
        },
      });
      return res.status(200).json(client);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Delete a client
  else if (req.method === "DELETE") {
    try {
      const { clientId } = req.query;
      const client = await prisma.client.delete({
        where: {
          id: clientId as string,
        },
      });
      return res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // Update a client
  else if (req.method === "PUT") {
    try {
      const { clientId } = req.query;
      const { clientData } = req.body;
      console.log("Updated client: ", clientData);

      const client = await prisma.client.update({
        where: {
          id: clientId as string,
        },
        data: {
          ...clientData,
        },
      });

      return res.status(200).json(client);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
