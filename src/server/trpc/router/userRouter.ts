import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
});
