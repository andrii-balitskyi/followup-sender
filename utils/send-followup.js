import path from "path";
import dotenv from "dotenv";
import { getFirstFollowup } from "./followups/get-1-followup.js";
import { getSecondFollowup } from "./followups/get-2-followup.js";
import { getThirdFollowup } from "./followups/get-3-followup.js";
import { getFourthFollowup } from "./followups/get-4-followup.js";
import { getInitialEmail } from "./followups/index.js";
import { responseEmailsData } from "../index.js";
import { getCurrentFormattedDate } from "./get-current-formatted-date.js";
import formatWebsite from "./format-website.js";

dotenv.config();

let sentEmailCount = 0;

export const sendFollowup = ({
  to,
  followupNumber,
  website,
  gmailClient,
  messageId,
  date,
}) => {
  const formattedWebsite = formatWebsite(website);
  console.log(`WEBSITE: ${formattedWebsite}`);
  const followupMap = {
    0: getInitialEmail(formattedWebsite),
    1: getFirstFollowup(formattedWebsite),
    2: getSecondFollowup(formattedWebsite),
    3: getThirdFollowup(formattedWebsite),
    4: getFourthFollowup(formattedWebsite),
  };
  const { body, subject } = followupMap[followupNumber];

  gmailClient
    .sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: body,
      inReplyTo: messageId ?? null,
      attachments: [
        {
          filename: "download.jpeg",
          path: path.resolve("utils", "logo-signature.png"),
          cid: "logo",
        },
      ],
    })
    .then((emailRes) => {
      if (!messageId) {
        responseEmailsData.push({
          EMAIL: Array.isArray(to) ? to.join(", ") : to,
          DATE: getCurrentFormattedDate(date),
          WEBSITE: website,
          MESSAGE_ID: emailRes.messageId.replace(/[<|>]/g, ""),
        });
      }

      console.log(`${++sentEmailCount} EMAILS SENT`);
    })
    .catch(console.error);
};

export default sendFollowup;
