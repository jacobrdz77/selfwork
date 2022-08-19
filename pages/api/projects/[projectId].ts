import { prisma } from "../../../src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects from current user
  // RETURN: array of projects
  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const projects = await prisma.project.findMany({
        where: {
          //@ts-ignore
          userId,
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

  // DELETE a project
  // RETURN: the deleted project
  else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const project = await prisma.project.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json(project);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Request Not Allowed" });
  }
}

// GET one project
// RETURN: a project
// if (req.method === "GET") {
//   try {
//
//     await prisma.$connect();
//     const { id } = req.body;
//     const project = await prisma.project.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     res.status(200).json(project);
//     await prisma.$disconnect();
//   } catch (error: Error | any) {
//     res.status(400).json({ error: error.message });
//   }
// }
