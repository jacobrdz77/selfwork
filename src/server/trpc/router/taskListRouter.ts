import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const taskListRouter = router({
  // Get all
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.taskList.findMany();
  }),
  //   Get one
  getOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.findUnique({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Create one
  createOne: publicProcedure
    .input(
      z.object({
        taskList: z.object({
          name: z.string(),
          description: z.string(),
          phone: z.string().max(10),
          email: z.string().email({ message: "Invalid email address." }),
          website: z.string(),
          businessAddress: z.string(),
          userId: z.string(),
        }),
      })
    )
    .query(({ input, ctx }) => {
      const taskListData = {
        name: input.taskList.name,
        description: input.taskList.description,
        email: input.taskList.email,
        phone: input.taskList.phone,
        businessAddress: input.taskList.businessAddress,
        website: input.taskList.website,
        user: {
          connect: {
            id: input.taskList.userId,
          },
        },
      };
      return ctx.prisma.taskList.create({
        data: taskListData,
      });
    }),
  // Delete one
  deleteOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.delete({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Update one
  updateOne: publicProcedure
    .input(
      z.object({
        taskListId: z.string(),
        newtaskListData: z.object({
          name: z.string(),
          description: z.string(),
          phone: z.string().max(10),
          email: z.string().email({ message: "Invalid email address." }),
          website: z.string(),
          businessAddress: z.string(),
          user: z.object({
            connect: z.object({
              id: z.string(),
            }),
          }),
        }),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.update({
        where: {
          id: input.taskListId,
        },
        data: {
          ...input.newtaskListData,
        },
      });
    }),
});
