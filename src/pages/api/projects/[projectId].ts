import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one project
  // RETURN: a project
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;
      const project = await prisma.project.findUnique({
        where: {
          id: projectId as string,
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
      const { projectId } = req.query;
      const project = await prisma.project.delete({
        where: {
          id: projectId as string,
        },
      });
      return res.status(200).json({ project, message: "DELETED PROJECT" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a project
  // RETURN: the updated project
  else if (req.method === "PUT") {
    try {
      const { projectId } = req.query;
      const { projectData } = req.body;
      const project = await prisma.project.update({
        where: {
          id: projectId as string,
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
}
