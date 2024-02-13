import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { updateSketchDataSchema } from "@/utils/sketchFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one sketch
  // RETURN: a sketch
  if (req.method === "GET") {
    try {
      const { sketchId } = req.query;
      const sketch = await prisma.sketch.findUnique({
        where: {
          id: sketchId as string,
        },
      });

      if (!sketch) {
        return res.status(404).json({ error: `Sketch ${sketchId} not found.` });
      }
      return res.status(200).json(sketch);
    } catch (error: Error | any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // DELETE a sketch
  // RETURN: the deleted sketch
  if (req.method === "DELETE") {
    try {
      const { sketchId } = req.query;
      const deletedSketch = await prisma.sketch.delete({
        where: {
          id: sketchId as string,
        },
      });
      return res.status(200).json(deletedSketch);
    } catch (error: Error | any) {
      return res.status(400).json(error);
    }
  }

  // UPDATE a sketch
  // RETURN: the updated sketch
  if (req.method === "PUT") {
    try {
      const { sketchId } = req.query;
      const sketchData = req.body;

      const validSketchData = updateSketchDataSchema.parse(sketchData);

      const sketch = await prisma.sketch.update({
        where: {
          id: sketchId as string,
        },
        data: {
          ...validSketchData,
        },
      });

      return res.status(200).json(sketch);
    } catch (error: Error | any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
