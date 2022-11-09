// src/server/router/_app.ts
import { router } from "../trpc";
import { clientRouter } from "./clientRouter";
import { projectRouter } from "./projectRouter";
import { taskListRouter } from "./taskListRouter";
import { taskRouter } from "./taskRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  client: clientRouter,
  project: projectRouter,
  task: taskRouter,
  taskList: taskListRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
