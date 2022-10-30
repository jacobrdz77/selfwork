import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const clientRouter = router({
  // Get all
  getAll: publicProcedure
    .input(z.object({ userId: z.string() }).optional())
    .query(({ input, ctx }) => {
      if (input) {
        return ctx.prisma.client.findMany({
          where: {
            id: input.userId,
          },
        });
      }
      return ctx.prisma.client.findMany();
    }),
  //   Get one
  getOne: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.client.findUnique({
        where: {
          id: input.clientId,
        },
      });
    }),
  // Create one
  createOne: publicProcedure
    .input(
      z.object({
        client: z.object({
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
    .mutation(({ input, ctx }) => {
      const clientData = {
        name: input.client.name,
        description: input.client.description,
        email: input.client.email,
        phone: input.client.phone,
        businessAddress: input.client.businessAddress,
        website: input.client.website,
        user: {
          connect: {
            id: input.client.userId,
          },
        },
      };
      return ctx.prisma.client.create({
        data: clientData,
      });
    }),
  // Delete one
  deleteOne: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.client.delete({
        where: {
          id: input.clientId,
        },
      });
    }),
  // Update one
  updateOne: publicProcedure
    .input(
      z.object({
        clientId: z.string(),
        newClientData: z.object({
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
    .mutation(({ input, ctx }) => {
      return ctx.prisma.client.update({
        where: {
          id: input.clientId,
        },
        data: {
          ...input.newClientData,
        },
      });
    }),
});
