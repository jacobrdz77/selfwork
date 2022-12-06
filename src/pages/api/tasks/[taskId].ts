import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one task
  // RETURN: a task
  if (req.method === "GET") {
    try {
      const { taskId } = req.query;
      const task = await prisma.task.findUnique({
        where: {
          id: taskId as string,
        },
      });
      return res.status(200).json(task);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a task
  // RETURN: the deleted task
  else if (req.method === "DELETE") {
    try {
      const { taskId } = req.query;
      const task = await prisma.task.delete({
        where: {
          id: taskId as string,
        },
      });
      return res.status(200).json({ task, message: "DELETED task" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a task
  // RETURN: the updated task
  else if (req.method === "PUT") {
    try {
      const { taskId } = req.query;
      const { taskData } = req.body;
      const task = await prisma.task.update({
        where: {
          id: taskId as string,
        },
        data: {
          ...taskData,
        },
      });
      return res.status(200).json(task);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
