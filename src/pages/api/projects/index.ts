import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { NewProjectData } from "@/types/types";
import { transformProjectData } from "@/utils/projectFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects from the workspaceId provided
  if (req.method === "GET") {
    try {
      const { workspaceId } = req.query;
      // For Development
      if (!workspaceId) {
        throw new Error("Provide a workspaceId.");
      }

      const projects = await prisma.project.findMany({
        where: {
          workspaceId: workspaceId as string,
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
      const { project } = req.body;

      // Transform the projects properties to valid datatypes
      const modifiedProject = transformProjectData(project);

      const projectData = {
        name: modifiedProject.name,
        description: modifiedProject.description,
        lumpSum: modifiedProject.lumpSum,
        priority: modifiedProject.priority,
        startDate: modifiedProject.startDate,
        dueDate: modifiedProject.dueDate,
        workspace: {
          connect: {
            id: modifiedProject.workspaceId,
          },
        },
        owner: {
          connect: {
            id: modifiedProject.ownerId,
          },
        },
      };

      const newProject = await prisma.project.create({
        data: projectData,
      });

      return res.status(200).json(newProject);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
