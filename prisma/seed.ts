import { projectIconColors } from "../src/utils/constants";
import getRandomInt from "../src/utils/getRandomInt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Creates a user with a workspace and in the workspace it creates a userSection
  await prisma.user.upsert({
    where: { id: "al814zcy86074hloymogrg1mv" },
    update: {},
    create: {
      id: "al814zcy86074hloymogrg1mv",
      name: "Jacob Rodriguez",
      userAssignedTasksSection: {
        create: {
          id: "cqpclt74u9945gpecetnyigta",
          name: "New Tasks",
        },
      },
    },
  });

  await prisma.workspace.upsert({
    where: { id: "opdclt74u9913gpecetnyigta" },
    update: {},
    create: {
      id: "opdclt74u9913gpecetnyigta",
      name: "My Workspace",
      owner: {
        connect: {
          id: "al814zcy86074hloymogrg1mv",
        },
      },
      members: {
        connect: {
          id: "al814zcy86074hloymogrg1mv",
        },
      },
    },
  });

  await prisma.project.upsert({
    where: { id: "cldclt74u9600gpecetnyigta" },
    update: {},
    create: {
      id: "cldclt74u9600gpecetnyigta",
      name: "Law Firm Website",
      priority: "High",
      description: "A website based on a local law firm.",
      iconColor: projectIconColors[getRandomInt(1, 11)],
      lumpSum: 2800,
      workspace: {
        connect: {
          id: "opdclt74u9913gpecetnyigta",
        },
      },
      owner: {
        connect: {
          id: "al814zcy86074hloymogrg1mv",
        },
      },
    },
  });

  await prisma.section.upsert({
    where: { id: "cldcljamz0001gpsobc3inw3n" },
    update: {},
    create: {
      id: "cldcljamz0001gpsobc3inw3n",
      name: "UI",
      project: {
        connect: {
          id: "cldclt74u9600gpecetnyigta",
        },
      },
      tasks: {
        create: [
          {
            name: "Create blue button",
          },
          {
            name: "Create navigation",
          },
        ],
      },
    },
  });

  await prisma.client.upsert({
    where: { id: "cldcljamz0001gpsobc3inw3n" },
    update: {},
    create: {
      id: "cldcljamz0001gpsobc3inw3n",
      name: "Bob Johnson",
      user: {
        connect: {
          id: "al814zcy86074hloymogrg1mv",
        },
      },
      email: "johnson@gmail.com",
      phone: "1231231234",
      projects: {
        connect: {
          id: "cldclt74u9600gpecetnyigta",
        },
      },
      companyName: "Dallas's Law Firm",
    },
  });
}

main();
