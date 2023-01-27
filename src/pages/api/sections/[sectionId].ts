import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one section
  // RETURN: a section
  if (req.method === "GET") {
    try {
      const { sectionId } = req.query;
      const section = await prisma.section.findUnique({
        where: {
          id: sectionId as string,
        },
      });
      return res.status(200).json(section);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a section
  // RETURN: the deleted section
  else if (req.method === "DELETE") {
    try {
      const { sectionId } = req.query;
      const deletedsection = await prisma.section.delete({
        where: {
          id: sectionId as string,
        },
      });
      return res
        .status(200)
        .json({ deletedsection, message: "DELETED section" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a section
  // RETURN: the updated section
  else if (req.method === "PUT") {
    try {
      const { sectionId } = req.query;
      const { sectionData } = req.body;
      const section = await prisma.section.update({
        where: {
          id: sectionId as string,
        },
        data: {
          ...sectionData,
        },
      });
      return res.status(200).json(section);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
