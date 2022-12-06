import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects from current user
  // RETURN: array of projects
  if (req.method === "GET") {
    try {
      const { userId } = req.body;
      const projects = await prisma.project.findMany({
        where: {
          userId: userId as string,
        },
        include: {
          client: {
            select: {
              name: true,
            },
          },
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
      // Get the project data from the request body
      const { project } = req.body;
      console.log("Project from request: ", project);
      const projectData = {
        name: project.name,
        description: project.description,
        hourlyRate: project.hourlyRate,
        startDate: new Date(project.startDate).toISOString(),
        dueDate:
          project.dueDate === null
            ? null
            : new Date(project.dueDate).toISOString(),
        priority: project.priority,
        client: {
          connect: {
            id: project.clientId,
          },
        },
        user: {
          connect: {
            id: project.userId,
          },
        },
      };

      const newProject = await prisma.project.create({
        data: projectData,
      });

      return res.status(200).json(newProject);
    } catch (error: any) {
      console.log("Request body: \n", req.body);
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
