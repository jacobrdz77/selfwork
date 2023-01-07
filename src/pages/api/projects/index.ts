import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { NewProjectData } from "../../../types/types";
import { transformProjectData } from "../../../utils/projectFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects from the userId provided
  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      // For Development
      if (!userId) {
        throw new Error("Provide a userId.", { cause: {} });
      }

      const projects = await prisma.project.findMany({
        where: {
          userId: userId as string,
        },
      });

      return res.status(200).json(projects);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new project
  if (req.method === "POST") {
    try {
      // Parse the body to transfrom the data
      const body = JSON.parse(req.body);
      const { project } = body;

      // Transform the projects properties to valid datatypes
      const transformedProject = transformProjectData(project);

      const projectData = {
        name: transformedProject.name,
        description: transformedProject.description,
        lumpSum: transformedProject.lumpSum,
        priority: transformedProject.priority,
        startDate: transformedProject.startDate,
        dueDate: transformedProject.dueDate,
        user: {
          connect: {
            id: transformedProject.userId,
          },
        },
      };

      const newProject = await prisma.project.create({
        data: projectData,
      });

      return res.status(200).json(newProject);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
