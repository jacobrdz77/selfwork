import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Task } from "@prisma/client";
import prisma from "../../../../prisma/client";
import { z } from "zod";
import { createSketchDataSchema } from "@/utils/sketchFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all sketches
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;
      const projectSketches = await prisma.sketch.findMany({
        where: { projectId: projectId as string },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });

      return res.status(200).json(projectSketches);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new sketch
  if (req.method === "POST") {
    try {
      // Get the sketch data from the request body
      const sketchData = req.body;

      const { projectId, authorId } = createSketchDataSchema.parse(sketchData);

      const newSketch = await prisma.sketch.create({
        data: {
          name: "Untitled sketch",
          project: {
            connect: {
              id: projectId,
            },
          },
          author: {
            connect: {
              id: authorId,
            },
          },
          canvasState: {
            canvasVersion: 0,
            elements: [],
            appState: {},
          },
        },
      });

      return res.status(200).json(newSketch);
    } catch (error: any) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  return res.status(400).json({ error: "Request Not Allowed" });
}
