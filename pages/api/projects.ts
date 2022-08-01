import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all projects
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient();
      prisma.$connect();
      const { userId } = req.body;
      const project = prisma.project.findMany({
        where: {
          userId: userId,
        },
      });
      res.status(200).json(project);
      prisma.$disconnect();
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get one project
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient();
      prisma.$connect();
      const { id } = req.body;
      const project = prisma.project.findUnique({
        where: {
          id: id,
        },
      });
      res.status(200).json(project);
      prisma.$disconnect();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Create a new project
  if (req.method === "POST") {
    try {
      const prisma = new PrismaClient();
      prisma.$connect();
      const { projectData } = req.body;
      const newProject = await prisma.project.create({
        data: {
          ...projectData,
        },
      });
      res.status(200).json(newProject);
      prisma.$disconnect();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
