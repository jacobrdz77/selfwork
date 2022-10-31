import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { Priority } from "@prisma/client";

export const projectRouter = router({
  // Get all
  getAll: publicProcedure
    .input(z.object({ userId: z.string() }).optional())
    .query(({ input, ctx }) => {
      if (input) {
        return ctx.prisma.project.findMany({
          where: {
            id: input.userId,
          },
        });
      }
      return ctx.prisma.project.findMany();
    }),
  //   Get one
  getOne: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
      });
    }),
  // Create one
  createOne: publicProcedure
    .input(
      z.object({
        project: z.object({
          name: z.string(),
          description: z.string().optional(),
          startDate: z.date().default(new Date()),
          dueDate: z.date().optional(),
          clientId: z.string(),
          clientName: z.string(),
          hourlyRate: z.number().min(0).optional(),
          priority: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]).default("NONE"),
          userId: z.string(),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      const projectData = {
        name: input.project.name,
        description: input.project.description,
        startDate: input.project.startDate,
        dueDate: input.project.dueDate,
        hourlyRate: input.project.hourlyRate,
        priority: input.project.priority,
        user: {
          connect: {
            id: input.project.userId,
          },
        },
        client: {
          connect: {
            id: input.project.clientId,
          },
        },
      };
      return ctx.prisma.project.create({
        data: projectData,
      });
    }),
  // Delete one
  deleteOne: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });
    }),
  // Update one
  updateOne: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        newProjectData: z.object({
          name: z.string(),
          description: z.string(),
          startDate: z.date(),
          dueDate: z.date(),
          clientId: z.string(),
          clientName: z.string(),
          hourlyRate: z.number().min(0),
          priority: z.enum(["NONE", "LOW", "MEDIUM", "HIGH"]),
          userId: z.string(),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          ...input.newProjectData,
        },
      });
    }),
});
