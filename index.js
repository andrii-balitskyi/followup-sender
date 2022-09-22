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
    const firstFiftySitesToEmails = sitesToEmails.splice(0, 40);

    for (const {
      WEBSITE,
      DATE,
      EMAIL,
      MESSAGE_ID,
    } of firstFiftySitesToEmails) {
      let email = EMAIL.trim();
      email = email.includes(",") ? email.split(",") : email;

      if (typeof email === "string") {
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

      email = formatEmailsInArray(email);

      for (const e of email) {
        console.log(`EMAIL: ${e}`);
        sendFollowup({
          to: e,
          followupNumber,
          website: WEBSITE,
          gmailClient,
          messageId: MESSAGE_ID,
          date: DATE,
        });

        await sleep(1000);
      }
    }

    gmailClient.close();
    await sleep(300000);
  } while (sitesToEmails.length !== 0);

  jsonToXlsx(responseEmailsData);
};

main();
