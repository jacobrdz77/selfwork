import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { NewProjectData } from "@/types/types";
import { transformProjectData } from "@/utils/projectFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a new project
  if (req.method === "POST") {
    try {
      // PARSE
      // const body = JSON.parse(req.body);
      const { project } = req.body;
      if (!project) {
        return res.status(400).json({ error: "Provide project data." });
      }

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
        // Creates a new section on every new project
        sections: {
          create: {
            name: "Untitled Section",
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
