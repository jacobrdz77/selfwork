import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";
import { transformColor } from "@/utils/TransformColor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one project
  // RETURN: a project
  if (req.method === "GET") {
    try {
      const { projectId, select } = req.query;

      if (select === "members") {
        const projectMembers = await prisma.project.findUnique({
          where: {
            id: projectId as string,
          },
          select: {
            members: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        });

        return res.status(200).json(projectMembers);
      }

      const project = await prisma.project.findUnique({
        where: {
          id: projectId as string,
        },
        include: {
          sections: {
            include: {
              tasks: true,
            },
          },
          members: true,
          urlLinks: true,
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      if (!project) {
        return res
          .status(404)
          .json({ error: `Project ${projectId} not found.` });
      }

      return res.status(200).json(project);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a project
  // RETURN: the deleted project
  else if (req.method === "DELETE") {
    try {
      const { projectId } = req.query;
      const deletedProject = await prisma.project.delete({
        where: {
          id: projectId as string,
        },
      });
      return res.status(200).json(deletedProject);
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a project
  // RETURN: the updated project
  else if (req.method === "PUT") {
    try {
      const { projectData } = req.body;
      const { projectId } = req.query;

      const updatedProject = await prisma.project.update({
        where: {
          id: projectId as string,
        },
        data: {
          ...projectData,
          iconColor: transformColor(projectData.iconColor),
        },
      });

      return res.status(200).json(updatedProject);
    } catch (error: Error | any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
