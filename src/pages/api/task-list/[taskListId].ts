import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one taskList
  // RETURN: a taskList
  if (req.method === "GET") {
    try {
      const { taskListId } = req.query;
      const taskList = await prisma.taskList.findUnique({
        where: {
          id: taskListId as string,
        },
      });
      return res.status(200).json(taskList);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a taskList
  // RETURN: the deleted taskList
  else if (req.method === "DELETE") {
    try {
      const { taskListId } = req.query;
      const deletedTaskList = await prisma.taskList.delete({
        where: {
          id: taskListId as string,
        },
      });
      return res
        .status(200)
        .json({ deletedTaskList, message: "DELETED taskList" });
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a taskList
  // RETURN: the updated taskList
  else if (req.method === "PUT") {
    try {
      const { taskListId } = req.query;
      const { taskListData } = req.body;
      const taskList = await prisma.taskList.update({
        where: {
          id: taskListId as string,
        },
        data: {
          ...taskListData,
        },
      });
      return res.status(200).json(taskList);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
