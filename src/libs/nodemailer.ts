import { Project, Workspace } from "@prisma/client";
import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const sendWorkspaceInvite = (workspace: Workspace, userEmail: string) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: userEmail,
    subject: `Action Required: ${process.env.EMAIL_SENDER} invited you to join ${workspace.name} in Selfwork`,
    text: `${process.env.EMAIL_SENDER} has invited you to join their team!`,
  };

  transpoter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent!");
    }
  });
};

const sendProjectInvite = (project: Project, userEmail: string) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: userEmail,
    subject: `${process.env.EMAIL_SENDER} shared a project with you!`,
    text: `${process.env.EMAIL_SENDER} shared a project with you!`,
  };

  transpoter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent!");
    }
  });
};
