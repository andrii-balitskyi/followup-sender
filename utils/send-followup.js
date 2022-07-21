import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import getFirstFollowup from "./followups/get-first-followup.js";
import getSignature from "./get-signature.js";

dotenv.config();

const emailClient = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

emailClient.verify().then(console.log).catch(console.error);

export const sendFollowup = ({ to, followupNumber }) => {
  const followupMap = { 1: getFirstFollowup };
  const getSelectedFollowup = followupMap[followupNumber];
  const { body, subject } = getSelectedFollowup();

  emailClient
    .sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: body,
      attachments: [
        {
          filename: "download.jpeg",
          path: path.resolve("utils", "logo-signature.png"),
          cid: "logo",
        },
      ],
    })
    .then((info) => {
      console.log("=============");
      console.log(
        JSON.stringify(
          {
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
          },
          null,
          "  "
        )
      );
      console.log("=============");
    })
    .catch(console.error);
};
sendFollowup({ to: "", followupNumber: 1 });
export default sendFollowup;
