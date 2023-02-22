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

      if (!projectId && !userId) {
        return res
          .status(400)
          .json({ error: "Specify a userId or projectId." });
      }

      // Fetch sections relating to a project
      if (projectId && !userId) {
        const section = await prisma.section.findMany({
          where: {
            projectId: projectId as string,
          },
          orderBy: [
            {
              createdAt: "asc",
            },
          ],
          include: {
            tasks: {
              include: {
                assignee: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
                tags: true,
              },
            },
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
              orderBy: [
                {
                  createdAt: "asc",
                },
              ],
              include: {
                tasks: {
                  include: {
                    assignee: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                      },
                    },
                    tags: true,
                  },
                },
              },
            },
            userAssignedTasksSection: {
              include: {
                tasks: {
                  include: {
                    assignee: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                      },
                    },
                    tags: true,
                  },
                },
              },
            },
          },
        });

        return res.status(200).json(userSections);
      }
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Todo: Update sectionData
  // Create a new section
  if (req.method === "POST") {
    try {
      // Get the section data from the request body
      const body = JSON.parse(req.body);
      const { sectionData } = body;
      const { projectId, userId } = req.query;

      if (!projectId && !userId) {
        return res
          .status(400)
          .json({ error: "Specify a userId or projectId." });
      }

      // Create new project section
      if (projectId && !userId) {
        const newSection = await prisma.section.create({
          data: {
            name: sectionData.name,
            project: {
              connect: {
                id: projectId as string,
              },
            },
          },
          include: {
            tasks: true,
          },
        });
        return res.status(200).json(newSection);
      }

      // Create new user section
      if (userId && !projectId) {
        const newSection = await prisma.section.create({
          data: {
            name: sectionData.name,
            user: {
              connect: {
                id: userId as string,
              },
            },
          },
          include: {
            tasks: true,
          },
        });
        return res.status(200).json(newSection);
      }
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
