import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Task } from "@prisma/client";
import prisma from "../../../../prisma/client";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get all sketches
  if (req.method === "GET") {
    try {
      const { projectId } = req.query;

      const projectSketches = await prisma.sketch.findMany();
      console.log(projectSketches);

      return res.status(200).json(projectSketches);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Create a new sketch
  if (req.method === "POST") {
    try {
      // Get the sketch data from the request body
      const body = JSON.parse(req.body);
      const { sketchData } = body;

      // Validate incoming body
      const sketchDataSchema = z.object({
        name: z.string(),
        projectId: z.string(),
      });

      const { name, projectId } = sketchDataSchema.parse(sketchData);

      const jsonElements = [] as Prisma.JsonArray;

      const newSketch = await prisma.sketch.create({
        data: {
          name: name,
          project: {
            connect: {
              id: projectId,
            },
          },
          elements: jsonElements,
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
