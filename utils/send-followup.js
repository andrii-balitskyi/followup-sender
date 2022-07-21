import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import getFirstFollowup from "./followups/get-first-followup.js";
import getSecondFollowup from "./followups/get-second-followup.js";

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

export const sendFollowup = ({ to, followupNumber, website }) => {
  const followupMap = { 1: getFirstFollowup(), 2: getSecondFollowup(website) };
  const { body, subject } = followupMap[followupNumber];

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

export default sendFollowup;
