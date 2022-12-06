import { NextApiRequest, NextApiResponse } from "next";
import { Task, TaskList } from "@prisma/client";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all TaskList
  if (req.method === "GET") {
    try {
      const { projectId } = req.body;
      const taskList = await prisma.taskList.findMany({
        where: {
          projectId: projectId as string,
        },
      });
      return res.status(200).json(taskList);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new taskList
  if (req.method === "POST") {
    try {
      // Get the taskList data from the request body
      const { taskList } = req.body;
      const taskData = {
        ...taskList,
        project: {
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
