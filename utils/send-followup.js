import path from "path";
import dotenv from "dotenv";
import {
  getInitialEmail,
  getFirstFollowup,
  getSecondFollowup,
  getThirdFollowup,
  getFourthFollowup,
} from "./followups/index.js";
import formatWebsite from "./format-website.js";

dotenv.config();

export const sendFollowup = async ({
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

  const responseBase = {
    EMAIL: Array.isArray(to) ? to.join(", ") : to,
    DATE:
      typeof date === "number"
        ? new Date((date - 25569) * 86400 * 1000).toISOString().split("T")[0]
        : "",

    WEBSITE: website,
  };

  try {
    const sentEmailData = await gmailClient.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html: body,
      inReplyTo: messageId ?? undefined,
      references: messageId ?? undefined,
      attachments: [
        {
          filename: "download.jpeg",
          path: path.resolve("utils", "logo-signature.png"),
          cid: "logo",
        },
      ],
    });

    return {
      ...responseBase,
      MESSAGE_ID: sentEmailData.messageId.replace(/[<|>]/g, ""),
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      ...responseBase,
      ERROR_MESSAGE: `${err?.name}: ${err?.message}`,
      success: false,
    };
  }
};

export default sendFollowup;
