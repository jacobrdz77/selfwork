import { prisma } from "../../../src/lib/prisma";
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
}
