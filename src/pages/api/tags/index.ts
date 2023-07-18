import { NextApiRequest, NextApiResponse } from "next";
import { Task, Section } from "@prisma/client";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all tags
  if (req.method === "GET") {
    try {
      const { tagId } = req.query;

      if (!tagId) {
        return res
          .status(400)
          .json({ error: "Specify a userId or projectId." });
      }

      // Fetch tags relating to a project
      const tags = await prisma.tag.findMany({
        where: {
          id: tagId as string,
        },
      });
      return res.status(200).json(tags);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Todo: Update sectionData
  // Create a new tags
  if (req.method === "POST") {
    try {
      // Get the section data from the request body
      const body = JSON.parse(req.body);
      const { sectionData } = body;
      const { projectId, userId } = req.query;
      console.log("Making User Section");

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
            tasks: {
              include: {
                tags: true,
              },
            },
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
