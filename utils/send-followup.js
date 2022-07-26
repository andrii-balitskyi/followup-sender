import path from "path";
import dotenv from "dotenv";
import getFirstFollowup from "./followups/get-1-followup.js";
import getSecondFollowup from "./followups/get-2-followup.js";
import getThirdFollowup from "./followups/get-3-followup.js";
import getFourthFollowup from "./followups/get-4-followup.js";

dotenv.config();

let sentEmailCount = 0;

export const sendFollowup = ({ to, followupNumber, website, emailClient }) => {
  // console.log(`Sending email to ${to}`);
  // console.log(`Website: ${website}`);
  const followupMap = {
    1: getFirstFollowup(website),
    2: getSecondFollowup(website),
    3: getThirdFollowup(website),
    4: getFourthFollowup(website),
  };
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
    .then(() => {
      console.log(`${++sentEmailCount} EMAILS SENT`);
    })
    .catch(console.error);
};

export default sendFollowup;
