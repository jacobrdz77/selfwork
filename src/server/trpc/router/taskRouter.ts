import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const taskRouter = router({
  // Get all
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany();
  }),
  //   Get one
  getOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.task.findUnique({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Create one
  createOne: publicProcedure
    .input(
      z.object({
        task: z.object({
          name: z.string(),
          description: z.string(),
          isComplete: z.boolean(),
          priority: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]),
          startDate: z.date().min(new Date()),
          endDate: z.date().min(new Date()),
          userId: z.string(),
          taskListId: z.string(),
          projectId: z.string(),
          projectName: z.string(),
        }),
      })
    )
    .query(({ input, ctx }) => {
      // const taskListData = {
      //   name: input.task.name,
      //   description: input.task.description,
      //   userId: input.task.userId,
      //   projectId: input.task.projectId,
      //   isComplete: input.task.isComplete,
      //   priority: input.task.priority,
      //   startDate: input.task.startDate,
      //   endDate: input.task.endDate,
      //   taskListId: input.task.taskListId,
      //   user: {
      //     connect: {
      //       id: input.task.userId,
      //     },
      //   },
      //   taskList: {
      //     connect: {
      //       id: input.task.taskListId,
      //     },
      //   },
      //   project: {
      //     connect: {
      //       name: input.task.projectName,
      //     },
      //   },
      // };
      return ctx.prisma.task.create({
        data: { ...input.task },
      });
    }),
  // Delete one
  deleteOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Update one
  updateOne: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        newTaskData: z.object({
          name: z.string(),
          description: z.string(),
          isComplete: z.boolean(),
          priority: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]),
          startDate: z.date().min(new Date()),
          endDate: z.date().min(new Date()),
          userId: z.string(),
          taskListId: z.string(),
          projectId: z.string(),
          projectName: z.string(),
        }),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          ...input.newTaskData,
        },
      });
    }),
});
