import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // DELETE a tag
  // RETURN: the deleted tag
  if (req.method === "DELETE") {
    try {
      const { tagId } = req.query;
      const deletedtag = await prisma.tag.delete({
        where: {
          id: tagId as string,
        },
      });
      return res.status(200).json({ deletedtag, message: "DELETED tag" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a tag
  // RETURN: the updated tag
  if (req.method === "PUT") {
    try {
      const { tagId } = req.query;
      const body = JSON.parse(req.body);
      const { tagData } = body;
      const tag = await prisma.tag.update({
        where: {
          id: tagId as string,
        },
        data: {
          name: tagData.name,
        },
      });
      return res.status(200).json(tag);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
