import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get one user
  if (req.method === "GET") {
    try {
      const { userId } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
        include: {
          assignedTasks: true,
          involvedProjects: true,
        },
      });
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Update user
  else if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);
      const { userId } = req.query;
      const { userData } = body;
      // console.log("userdata: ", userData);
      const user = await prisma.user.update({
        where: {
          id: userId as string,
        },
        data: {
          mobilePhone: userData.phone,
          name: userData.name,
          email: userData.email,
        },
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Method not allowed" });
  }
}
