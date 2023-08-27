// import { sendInvite } from "@/utils/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // INVITE new member
  if (req.method === "POST") {
    try {
      // const body = JSON.parse(req.body);
      // const { message, newMemberEmail, projectName } = body;
      // const { projectId } = req.query;
      // console.log("Invite body: ", body);

      // Create projectLink
      // const projectLink = `http://localhost:3000/projects/${projectId}/invite`;

      // const response = await sendInvite({
      //   senderEmail: "jacob@gmail.com",
      //   message,
      //   newMemberEmail,
      //   projectLink,
      //   projectName,
      // });

      // console.log(response);

      return res.status(200).json({
        message: "Invited member and added member.",
      });
    } catch (error: Error | any) {
      // console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
  return res.status(400).json({ error: "Request Not Allowed" });
}
