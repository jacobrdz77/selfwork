import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { transformProjectData } from "@/utils/projectFunctions";
import getRandomInt from "@/utils/getRandomInt";
import { projectIconColors } from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET all projects
  if (req.method === "GET") {
    const projects = await prisma.project.findMany();
    res.status(200).json({ projects: projects });
  }

  // Create a new project
  if (req.method === "POST") {
    try {
      // PARSE
      const body = JSON.parse(req.body);
      const { project } = body;
      if (!project) {
        return res.status(400).json({ error: "Provide project data." });
      }

      if (project.clientId) {
        const client = await prisma.client.findUnique({
          where: {
            id: project.clientId,
          },
        });

        // Todo Remind: IDK what this does
        // Updates client's total lump sum money
        await prisma.client.update({
          where: {
            id: project.clientId,
          },
          data: {
            totalLumpSum:
              Number(client?.totalLumpSum) + Number(project.lumpSum),
          },
        });
      }

      // Restrict the amount of projects
      const projects = await prisma.project.findMany();
      if (projects.length >= 3) {
        return res
          .status(400)
          .json({ error: "Upgrade to premium to create more projects." });
      }

      // Transform the projects properties to valid datatypes
      const modifiedProject = transformProjectData(project);

      const newProject = await prisma.project.create({
        data: {
          name: modifiedProject.name,

          description: modifiedProject.description,
          lumpSum: modifiedProject.lumpSum,
          priority: modifiedProject.priority,
          startDate: modifiedProject.startDate,
          dueDate: modifiedProject.dueDate,
          iconColor: projectIconColors[getRandomInt(0, 11)],
          // If clientId is included, then it connects, if not, it doesn't
          client: modifiedProject.clientId
            ? {
                connect: {
                  id: modifiedProject.clientId,
                },
              }
            : undefined,
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

          members: {
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
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
