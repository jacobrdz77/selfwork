import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one link
  // RETURN: a link
  if (req.method === "GET") {
    try {
      const { linkId } = req.query;
      const link = await prisma.link.findUnique({
        where: {
          id: linkId as string,
        },
      });

      if (!link) {
        return res.status(404).json({ error: `link ${linkId} not found.` });
      }
      return res.status(200).json(link);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a link
  // RETURN: the deleted link
  if (req.method === "DELETE") {
    try {
      const { linkId } = req.query;
      const deletedLink = await prisma.link.delete({
        where: {
          id: linkId as string,
        },
      });
      return res.status(200).json(deletedLink);
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a link
  // RETURN: the updated link
  if (req.method === "PUT") {
    try {
      const { linkId } = req.query;
      const body = JSON.parse(req.body);
      const { link } = body;
      const updatedLink = await prisma.link.update({
        where: {
          id: linkId as string,
        },
        data: {
          name: link.name,
          url: link.url,
        },
      });

      return res.status(200).json(updatedLink);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
