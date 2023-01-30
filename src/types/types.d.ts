import type { DefaultUser } from "next-auth";
import type {
  Priority,
  Prisma,
  Project,
  Section,
  Task,
  User,
  Workspace,
} from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

//Data Structure from Frontend
type NewProjectData = {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
  workspaceId: string;
  ownerId: string;
};

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

export type ProjectWithSections = Project & {
  sections: SectionWithTasks[];
};

export type NewClientData = {
  name: string;
  description: string;
  userId: string;
  businessAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
};

// Section types
type SectionWithTasks = Section & {
  tasks: Task[];
};

export type WorkspaceWithMembers = Workspace & {
  owner: User;
  members: User[];
};
