import type { DefaultUser } from "next-auth";
import type {
  Note,
  Priority,
  Prisma,
  Project,
  Section,
  Tag,
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
export type NewProjectFormData = {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
};

export type NewProject = {
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

type OneProjectWithSections = Project & {
  sections: Section[];
};

export type ProjectsWithSections = [OneProjectWithSections];

export type ProjectWithAll = Project & {
  sections: SectionWithTasks[];
  members: User[];
  notes: Note[];
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
  tasks: TaskWithAssignee[];
};

export type WorkspaceWithMembers = Workspace & {
  owner: User;
  members: User[];
};
export type WorkspaceWithProjects = Workspace & {
  owner: User;
  members: User[];
  projects: Project[];
};

export type UserSections = {
  userSections: [SectionWithTasks];
  userAssignedTasksSection: SectionWithTasks;
};

export type TaskWithAssignee = Task & {
  assignee: Pick<User, "id" | "name" | "email">;
  tags: Tag[];
};
