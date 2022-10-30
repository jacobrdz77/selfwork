import { Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

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
      const task = req.body.task;
      const taskData = {
        ...task,
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
