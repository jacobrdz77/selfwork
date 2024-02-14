import type { DefaultUser } from "next-auth";
import type {
  Client,
  Links,
  Note,
  Priority,
  Prisma,
  Project,
  ProjectStatus,
  Section,
  Sketch,
  Status,
  Tag,
  Task,
  User,
  Workspace,
} from "@prisma/client";
import client from "../../prisma/client";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

export type Partial<T> = {
  [P in keyof T]?: T[P];
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

export type NewProjectFormData = {
  name: string;
  description: string;
  lumpSum: number;
  startDate: string;
  dueDate: string;
  priority: Priority;
  clientId?: string;
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
  clientId?: string;
};

export type UpdateProjectData = {
  id?: number;
  name?: string;
  lumpSum?: number;
  priority?: Priority;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  clientId?: string;
  iconColor?: Color;
  status?: ProjectStatus;
};

type OneProjectWithSections = Project & {
  sections: Section[];
};

export type ProjectSections = {
  sections: Section[];
};

export type ProjectsWithSections = [OneProjectWithSections];

export type ProjectWithAll = Project & {
  sections: SectionWithTasks[];
  members: User[];
  notes: Note[];
  urlLinks: Links[];
  owner: { id: string; name: string; image: string };
};

export type NewLink = {
  name: string;
  url: string;
  projectId: string;
};

// Section types
export type SectionWithTasks = Section & {
  tasks: TaskWithAssignee[];
};

export type UserSections = {
  userSections: SectionWithTasks[];
  userAssignedTasksSection: SectionWithTasks;
};

export type TaskData = {
  name?: string;
  description?: string;
  priority?: Priority;
  status?: TaskStatus;
  isComplete?: boolean;
  startDate?: Date | null;
  dueDate?: Date | null;
  projectId?: string | null;
  assigneeId?: string | null;
  assignee?: { name: string | null } | null;
  sectionId?: string | null;
};

export type NewTaskData = {
  name: string;
  sectionId: string;
  description: string;
  assignee: User | null;
  priority: Priority | null;
  order: number;
};

export type TaskWithAssignee = Task & {
  assignee: User;
  tags: Tag[];
};

export type ClientStatus = "Active" | "Pending" | "Closed";

export type NewClientData = {
  name: string;
  email: string;
  companyName?: string;
  businessAddress?: string;
  phone?: string;
};

export type ClientWithProjects = Client & {
  projects: Project[];
};

export type UpdateClientData = {
  id?: string;
  name?: string;
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  businessAddress?: string | null;
  userId?: string;
  order?: number | null;
  status?: Status;
  totalMonthly?: runtime.Decimal;
  totalLumpSum?: runtime.Decimal;
};

export type UpdateUserData = {
  name: string | null;
  email: string | null;
  phone: string | null;
};

export type UserWithAll = User & {
  assignedTasks: Task[];
  involvedProjects: Project[];
};

export type NewTag = {
  name: string;
  taskId: string;
  color?: Color;
};
export type UpdateTagData = {
  name?: string;
  taskId?: string;
  color?: Color;
};

export type UpdateSketchData = {
  name?: string;
  canvasState?: any;
};

export type NewSketchData = {
  projectId: string;
  authorId: string;
};

export type SketchWithAuthor = Sketch & {
  author: {
    name: string;
    image: string;
  };
};

export type SketchCanvasState = {
  elements: any[];
  appState: object;
  files?: object;
  canvasVersion: number;
};

export type InviteesEmails = { id: string; email: string }[];

export type Members = {
  members: { id: string; name: string; email: string; image: string }[];
  owner: { id: string; name: string; email: string; image: string };
};
