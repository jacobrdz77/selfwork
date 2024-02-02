import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { TaskData } from "@/hooks/TaskHooks";
import findInterval from "@/utils/findInterval";

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
      console.log("Error: ", error);
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
      const { taskId, order_change } = req.query;
      const taskData = JSON.parse(req.body);

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

      //pathway "/api/task/{taskId}?orderChange=true"
      if (order_change) {
        const newOrder = Number(taskData.newOrder);
        const currentOrder = taskData.currentOrder as number;

        if (newOrder === currentOrder) {
          return res.status(400).json({
            error: "Can't change order to the same order",
          });
        }

        const [least, greatest] = findInterval(currentOrder, newOrder);

        const allTasks = await prisma.task.findMany({
          where: { order: { gte: least, lte: greatest } },
          orderBy: { order: "asc" },
        });

        // Find the task to move
        const taskToMove = allTasks.find((task) => task.id === taskId);

        if (!taskToMove) {
          throw new Error(`Task with ID ${taskId} not found.`);
        }

        // Calculate new order for each task
        const updatedTasks = allTasks.map((task) => {
          if (task.order != null)
            if (task.id === taskId) {
              return { id: task.id, order: newOrder };
            }

            // Moves Tasks right 1
            else if (
              task.order >= newOrder &&
              task.id !== taskId &&
              currentOrder > newOrder
            ) {
              return { id: task.id, order: task.order + 1 };
            }

            // Moves Tasks left 1
            else if (
              task.order <= newOrder &&
              task.id !== taskId &&
              task.order > 0 &&
              currentOrder < newOrder
            ) {
              // if(task.order === newOrder) {}

              return { id: task.id, order: task.order - 1 };
            }
        });

        const updates = () => {
          // @ts-ignore
          return bulkUpdate("Task", updatedTasks);
        };

        await prisma.$transaction(updates);

        return res.status(200).json({
          updatedTasks,
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
