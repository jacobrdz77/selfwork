import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";

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
      // Transform Data
      const projectData = {
        name: project.name,
          description: project.description,
          hourlyRate: project.hourlyRate,
          dueDate: new Date(project.dueDate).toISOString(),
          startDate: new Date(project.startDate).toISOString(),
          priority: project.priority,
          client: {
            connect: {
              id: project.clientId
            }
          },
          user: {
            connect: {
              id: project.userId,
            }
          }
      };
      console.log("New Project:\n", projectData)
      // Create a new project
      const newProject = await prisma.project.create({
        data: projectData,
      });
      return res.status(200).json(newProject);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }

    // DELETE a project
  // RETURN: the deleted project
  if (req.method === "DELETE") {
    try {
      const { projectId } = req.body;
      const project = await prisma.project.delete({
        where: {
          id: projectId,
        },
      });
      return res.status(200).json(project);
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a project
  // RETURN: the updated project
  else if (req.method === "PUT") {
    try {
      const { projectData } = req.body;
      const project = await prisma.project.update({
        where: {
          id: projectData.id,
        },
        data: {
          ...projectData,
        },
      });
      return res.status(200).json(project);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}


