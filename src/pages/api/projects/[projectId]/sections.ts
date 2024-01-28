import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Create a new section for PROJECT
  if (req.method === "POST") {
    try {
      const { sectionData } = JSON.parse(req.body);
      const { projectId } = req.query;

      // console.log("Making SECTION");

      if (!sectionData) {
        return res.status(400).json({
          error: "Provide sectionData.",
        });
      }

      const newSection = await prisma.section.create({
        data: {
          name: sectionData.name,
          project: {
            connect: {
              id: projectId as string,
            },
          },
        },
        include: {
          tasks: true,
        },
      });
      return res.status(200).json(newSection);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
