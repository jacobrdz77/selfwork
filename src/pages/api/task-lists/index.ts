import { NextApiRequest, NextApiResponse } from "next";
import { Task, TaskList } from "@prisma/client";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all task-lists
  if (req.method === "GET") {
    try {
      const projectId = req.query.projectId as string;
      // For Development
      if (!projectId) {
        throw new Error("Provide a projectId.", { cause: {} });
      }
      const taskList = await prisma.taskList.findMany({
        where: {
          projectId,
        },
      });
      return res.status(200).json(taskList);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new task-list
  if (req.method === "POST") {
    try {
      // Get the taskList data from the request body
      const { taskList } = req.body;
      const taskData = {
        ...taskList,
        website: {
          connect: {
            id: taskList.projectId,
          },
        },
      };

      const newTaskList = await prisma.taskList.create({
        data: taskData,
      });

      return res.status(200).json(newTaskList);
    } catch (error: any) {
      console.log("Request body: \n", req.body);
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
