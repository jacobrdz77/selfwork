import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { transformProjectData } from "@/utils/projectFunctions";
import getRandomInt from "@/utils/getRandomInt";
import { projectIconColors } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a new project
  if (req.method === "POST") {
    try {
      // PARSE
      const body = JSON.parse(req.body);
      const { project } = body;
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
        iconColor: "Classic",
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
        data: {
          name: modifiedProject.name,
          description: modifiedProject.description,
          lumpSum: modifiedProject.lumpSum,
          priority: modifiedProject.priority,
          startDate: modifiedProject.startDate,
          dueDate: modifiedProject.dueDate,
          iconColor: projectIconColors[getRandomInt(0, 11)],
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
        },
      });

      return res.status(200).json(newProject);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
