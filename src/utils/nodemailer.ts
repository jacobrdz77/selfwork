import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "user", // generated ethereal user
    pass: "password", // generated ethereal password
  },
});

export const sendInvite = async ({
  senderEmail,
  newMemberEmail,
  message,
  projectLink,
  projectName,
}: {
  senderEmail: string;
  newMemberEmail: string;
  message: string;
  projectLink: string;
  projectName: string;
}) => {
  const filePath =
    "C:\\Users\\Jacob\\development\\projects\\selfwork\\src\\components\\email\\invite.html";
  console.log("FILE : ", filePath);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const inputs = {
    senderEmail,
    projectLink,
    projectName,
    message,
  };

  const finalHTML = template(inputs);

  const info = await transporter.sendMail({
    from: senderEmail, // sender address
    to: newMemberEmail, // list of receivers
    subject: `${senderEmail} shared a project with you.`, // Subject line
    html: finalHTML, // html body
  });

  console.log("Message sent: %s", info);
};
