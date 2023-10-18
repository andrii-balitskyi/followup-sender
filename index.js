import xlsxToJson from "./utils/xlsx-to-json.js";
import path from "path";
import sendFollowup from "./utils/send-followup.js";
import { sleep } from "./utils/sleep.js";
import { formatEmailsInArray } from "./utils/format-emails-in-array.js";
import { getGmailClient } from "./utils/get-gmail-client.js";
import { jsonToXlsx } from "./utils/json-to-xlsx.js";

if (!["0", "1", "2", "3", "4"].includes(process.argv[2])) {
  throw new Error("Unknown followup number");
}

export const responseEmailsData = [];

const main = async () => {
  let sitesToEmails = xlsxToJson(path.resolve("followups.xlsx"));
  const followupNumber = process.argv[2];

  do {
    const gmailClient = getGmailClient();
    const firstThirtySitesToEmails = sitesToEmails.splice(0, 30);

    for (const {
      WEBSITE,
      DATE,
      EMAIL,
      MESSAGE_ID,
    } of firstThirtySitesToEmails) {
      let email = EMAIL?.trim();
      if (!email) continue;

      email = email?.includes(",") ? email?.split(",") : email;

      if (Array.isArray(email)) {
        email = formatEmailsInArray(email);
      }

      console.log(`EMAIL: ${email}`);
      sendFollowup({
        to: email,
        followupNumber,
        website: WEBSITE,
        gmailClient,
        messageId: MESSAGE_ID,
        date: DATE,
      });

      await sleep(1000);

      continue;
    }

    gmailClient.close();

    if (sitesToEmails.length === 0) {
      await sleep(5000);
    } else {
      await sleep(300000);
    }
  } while (sitesToEmails.length !== 0);

  if (responseEmailsData.length === 0) return;

  jsonToXlsx(responseEmailsData);
};

main();
