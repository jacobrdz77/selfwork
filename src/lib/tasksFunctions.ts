import { Task } from "@prisma/client";

export const createTask = async (task: Task) => {
  return fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      //@ts-ignore
      task: task,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};
