import { NextApiRequest, NextApiResponse } from "next";
import { Task, Section } from "@prisma/client";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all task-lists
  if (req.method === "GET") {
    try {
      const projectId = req.query.projectId as string;
      // For Development
      if (!projectId) {
        throw new Error("Provide a projectId.", { cause: {} });
      }
      const section = await prisma.section.findMany({
        where: {
          projectId,
        },
      });
      return res.status(200).json(section);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new task-list
  if (req.method === "POST") {
    try {
      // Get the section data from the request body
      const { section } = req.body;
      const taskData = {
        ...section,
        website: {
          connect: {
            id: section.projectId,
          },
        },
      };

      const newsection = await prisma.section.create({
        data: taskData,
      });

      return res.status(200).json(newsection);
    } catch (error: any) {
      console.log("Request body: \n", req.body);
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
