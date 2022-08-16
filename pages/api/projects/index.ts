import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../src/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a new project
  if (req.method === "POST") {
    try {
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
  } else {
    res.status(400).json({ error: "Request Not Allowed" });
  }
}
