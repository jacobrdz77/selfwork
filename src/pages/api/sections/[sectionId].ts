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

      if (!section) {
        return res
          .status(404)
          .json({ error: `Section ${sectionId} not found.` });
      }
      return res.status(200).json(section);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a section
  // RETURN: the deleted section
  if (req.method === "DELETE") {
    try {
      const { sectionId } = req.query;
      const deletedSection = await prisma.section.delete({
        where: {
          id: sectionId as string,
        },
      });
      return res
        .status(200)
        .json({ deletedSection, message: "DELETED section" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a section
  // RETURN: the updated section
  if (req.method === "PUT") {
    try {
      const { sectionId } = req.query;
      const body = JSON.parse(req.body);
      const { sectionData } = body;

      // Switching two sections "order"
      if (req.query.second) {
        const updatedFirstSection = await prisma.section.update({
          where: {
            id: sectionData.one.id,
          },
          data: {
            //! Use the other section's ORDER
            order: sectionData.two.order,
          },
        });

        const updatedSecondSection = await prisma.section.update({
          where: {
            id: sectionData.two.id,
          },
          data: {
            //! Use the other section's ORDER
            order: sectionData.one.order,
          },
        });

        return res.status(200).json({
          updatedFirstSection,
          updatedSecondSection,
        });
      }

      const section = await prisma.section.update({
        where: {
          id: sectionId as string,
        },
        data: {
          name: sectionData.name,
        },
      });
      return res.status(200).json(section);
    } catch (error: Error | any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
