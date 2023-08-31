import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prisma/client";
import { TaskData } from "@/hooks/TaskHooks";

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
        include: {
          assignee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          tags: true,
        },
      });

      if (!task) {
        return res.status(404).json({ error: `Task ${taskId} not found.` });
      }

      return res.status(200).json(task);
    } catch (error: Error | any) {
      console.log("ErrorFKLJFKLJ: ", error);
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
      const body = JSON.parse(req.body);
      const { taskData } = body;
      // console.log(taskData);

      const newData = {
        name: taskData.name,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        projectId: taskData.projectId ? taskData.projectId : undefined,
        status: taskData.status,
        isComplete: taskData.isComplete ? taskData.isComplete : undefined,
      };

      if (taskData.assigneeId === "remove") {
        const task = await prisma.task.update({
          where: {
            id: taskId as string,
          },
          data: {
            ...newData,
            assignee: {
              disconnect: true,
            },
          },
        });
        return res.status(200).json(task);
      }

      // Switching two sections "order"
      if (req.query.second) {
        const updatedFirstTask = await prisma.task.update({
          where: {
            id: taskData.one.id,
          },
          data: {
            //! Use the other task's ORDER
            order: taskData.two.order,
          },
        });

        const updatedSecondTask = await prisma.task.update({
          where: {
            id: taskData.two.id,
          },
          data: {
            //! Use the other task's ORDER
            order: taskData.one.order,
          },
        });

        return res.status(200).json({
          updatedFirstTask,
          updatedSecondTask,
        });
      }

      const task = await prisma.task.update({
        where: {
          id: taskId as string,
        },
        data: {
          ...newData,
          assignee: taskData.assigneeId
            ? {
                connect: {
                  id: taskData.assigneeId,
                },
              }
            : undefined,
        },
      });
      return res.status(200).json(task);
    } catch (error: Error | any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}
