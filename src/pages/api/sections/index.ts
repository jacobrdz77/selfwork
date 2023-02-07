import { NextApiRequest, NextApiResponse } from "next";
import { Task, Section } from "@prisma/client";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all sections
  if (req.method === "GET") {
    try {
      const { projectId, userId } = req.query;

      // Fetch sections relating to a project
      if (projectId && !userId) {
        const section = await prisma.section.findMany({
          where: {
            projectId: projectId as string,
          },
          include: {
            tasks: true,
          },
        });
        return res.status(200).json(section);
      }

      // Fetch user's sections
      if (userId && !projectId) {
        const userSections = await prisma.user.findUnique({
          where: {
            id: userId as string,
          },
          select: {
            userSections: {
              include: {
                tasks: true,
              },
            },
            userAssignedTasksSection: {
              include: {
                tasks: true,
              },
            },
          },
        });

        return res.status(200).json(userSections);
      }

      return res.status(400).json({ error: "Specify a userId or projectId." });
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Todo: Update sectionData
  // Create a new section
  if (req.method === "POST") {
    try {
      // Get the section data from the request body
      const { section } = req.body;
      const sectionData = {
        ...section,
        website: {
          connect: {
            id: section.projectId,
          },
        },
      };

      const newSection = await prisma.section.create({
        data: {
          name: section.name,
        },
      });

      return res.status(200).json(newSection);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
