import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";

export const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // if (session) {
  //   res.send({
  //     content:
  //       "This is protected content. You can access this content because you are signed in.",
  //   });
  // } else {
  //   res.send({
  //     error: "You must be sign in to view the protected content on this page.",
  //   });
  // }
};
