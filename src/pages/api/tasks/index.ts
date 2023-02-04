import { Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all tasks
  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany();
      return res.status(200).json(tasks);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new task
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const { task } = body;
      if (!task) {
        return res.status(400).json({ error: "Provide project data." });
      }

      /* 
        Different scenarios:
        - If the assignee is only defined
          - connect assignee and to the assignee's assignment section.
        - If the assignee and project is defined
          - connect the assignee to the task
          - connect the project and section to the task. 
      */

      if (!task.hasOwnProperty("sectionId")) {
        const newTask = await prisma.task.create({
          data: {
            name: task.name,
            description:
              task.description.trim().length === 0 ? null : task.description,
            priority: task.priority === null ? "None" : task.priority,
            section: {
              connect: {
                id: task.assignee.userAssignedTasksSectionId,
              },
            },
            assignee: {
              connect: {
                id: task.assignee.id,
              },
            },
          },
        });

        return res.status(200).json(newTask);
      }

      const newTask = await prisma.task.create({
        data: {
          name: task.name,
          description:
            task.description.trim().length === 0 ? null : task.description,
          priority: task.priority === null ? "None" : task.priority,
          section: {
            connect: {
              id: task.sectionId,
            },
          },
          assignee: {
            connect: {
              id: task.assignee.id,
            },
          },
        },
      });

      return res.status(200).json(newTask);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
