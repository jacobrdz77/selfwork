import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import findMinMax from "@/utils/findMinMax";
import { bulkUpdate } from "@/utils/bulkUpdate";

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

      const sectionToDelete = await prisma.section.findUnique({
        where: { id: sectionId as string },
        select: {
          order: true,
          projectId: true,
        },
      });

      const sectionsWithHigherOrder = await prisma.section.findMany({
        where: {
          order: { gt: sectionToDelete!.order! },
          projectId: sectionToDelete?.projectId,
        },
        orderBy: { order: "asc" },
      });

      const highestOrder = (await prisma.section.count()) - 1;

      if (sectionToDelete!.order === highestOrder) {
        const deletedSection = await prisma.section.delete({
          where: { id: sectionId as string },
        });

        return res.status(200).json(deletedSection);
      }

      // Calculate new order for each section after deleting
      const updatedSections = sectionsWithHigherOrder.map((section) => {
        return { id: section.id, order: section!.order! - 1 };
      });

      const updates = () => {
        // @ts-ignore
        return bulkUpdate("Section", updatedSections);
      };

      await prisma.$transaction(updates);

      const deletedSection = await prisma.section.delete({
        where: { id: sectionId as string },
      });

      console.log("Section deleted", deletedSection);

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
      const { sectionId, order_change } = req.query;
      const sectionData = req.body;

      //pathway "/api/section/{sectionId}?orderChange=true"
      if (order_change) {
        const newOrder = Number(sectionData.newOrder);
        const currentOrder = sectionData.currentOrder as number;

        if (newOrder === currentOrder) {
          return res.status(400).json({
            error: "Can't change order to the same order",
          });
        }

        const [least, greatest] = findMinMax(currentOrder, newOrder);

        const sectionsBetweenIntervals = await prisma.section.findMany({
          where: { order: { gte: least, lte: greatest } },
          orderBy: { order: "asc" },
        });

        // Find the section to move
        const sectionToMove = sectionsBetweenIntervals.find(
          (section) => section.id === sectionId
        );

        if (!sectionToMove) {
          throw new Error(`Section with ID ${sectionId} not found.`);
        }

        // Calculate new order for each section
        const updatedSections = sectionsBetweenIntervals.map((section) => {
          if (section.order != null)
            if (section.id === sectionId) {
              return { id: section.id, order: newOrder };
            }

            // Moves sections right 1
            else if (
              section.order >= newOrder &&
              section.id !== sectionId &&
              currentOrder > newOrder
            ) {
              return { id: section.id, order: section.order + 1 };
            }

            // Moves sections left 1
            else if (
              section.order <= newOrder &&
              section.id !== sectionId &&
              section.order > 0 &&
              currentOrder < newOrder
            ) {
              return { id: section.id, order: section.order - 1 };
            }
        });

        const updates = () => {
          // @ts-ignore
          return bulkUpdate("Section", updatedSections);
        };

        await prisma.$transaction(updates);

        return res.status(200).json({
          updatedSections,
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
