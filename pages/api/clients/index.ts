import { prisma } from "../../../src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  //Create a new client
  //RETURNS: the new client
  if (req.method === "POST") {
    const { client } = req.body
    const clientData = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      businessAddress: client.address,
      website: client.website,
      user: {
        connect: {
          id: client.userId
        }
      },
      projects: [],
    };
    const newClient = await prisma.client.create({
      data: clientData
    });
    return res.status(200).json(newClient);
  }

  // Delete a client
  // RETURNS: the deleted client
  else if (req.method === "DELETE") {
    const client = await prisma.client.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json(client);
  } else {
    return res.status(400).json({ error: "Request Not Allowed" });
  }
}
