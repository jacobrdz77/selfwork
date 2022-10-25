import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all tasks
  if (req.method === "GET") {
    try {
      const { userId } = req.body;
      const tasks = await prisma.task.findMany({
        where: {
          userId: userId as string,
        },
      });
      return res.status(200).json(tasks);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new task
  if (req.method === "POST") {
    try {
      // Get the task data from the request body
      const { task } = req.body;
      console.log("Project from request: ", task);
      const taskData = {
        name: task.name,
        description: task.description,
        isComplete: task.isComplete,
        category: task.category,
        user: {
          connect: {
            id: task.userId,
          },
        },
        project: {
          connect: {
            id: task.projectId,
          },
        },
      };

      const newTask = await prisma.task.create({
        data: taskData,
      });

      return res.status(200).json(newTask);
    } catch (error: any) {
      console.log("Request body: \n", req.body);
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
