import type { DefaultUser } from "next-auth";
import type { Priority } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

//Data Structure from Frontend
interface NewProjectData {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
  userId: string;
}

export type UpdateProjectData = {
  id: number;
  name?: string;
  lumpSum?: number;
  priority?: Priority;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  clientId?: string;
};

interface NewClientData {
  name: string;
  description: string;
  userId: string;
  businessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
}
