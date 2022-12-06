import type { DefaultUser } from "next-auth";
import type { Priority } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

interface NewProjectData {
  id?: string;
  name: string;
  description: string;
  clientId: string;
  hourlyRate: number;
  priority: Priority;
  startDate: string;
  dueDate: string | null;
  userId: string;
  client?: {
    name: string;
  };
}

interface NewClientData {
  id?: string;
  name: string;
  description: string;
  businessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
  userId: string;
  user: {
    connect: {
      id: string;
    };
  };
}
