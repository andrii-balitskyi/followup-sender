import xlsxToJson from "./utils/xlsx-to-json.js";
import path from "path";
import sendFollowup from "./utils/send-followup.js";
import { sleep } from "./utils/sleep.js";
import { formatEmail } from "./utils/format-emails-in-array.js";
import { getGmailClient } from "./utils/get-gmail-client.js";
import { writeJsonToXlsxFile } from "./utils/json-to-xlsx.js";

if (!["0", "1", "2", "3", "4"].includes(process.argv[2])) {
  throw new Error("Unknown followup number");
}

export const successfulEmailResponseData = [];
export const failedEmailResponseData = [];

const main = async () => {
  let sitesToEmails = xlsxToJson(path.resolve("followups.xlsx"));
  const followupNumber = process.argv[2];
  let sentEmailCount = 0;
  let failedEmailCount = 0;

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

      email = formatEmail(email?.includes(",") ? email?.split(",") : email);

      console.log(`EMAILS: ${email}`);
      const response = await sendFollowup({
        to: email,
        followupNumber,
        website: WEBSITE,
        gmailClient,
        messageId: MESSAGE_ID,
        date: DATE,
      });

      if (response.success) {
        // Don't save response if MESSAGE_ID was already assigned
        if (!MESSAGE_ID)
          successfulEmailResponseData.push({
            EMAIL: response.EMAIL,
            DATE: response.DATE,
            WEBSITE: response.WEBSITE,
            MESSAGE_ID: response.MESSAGE_ID,
          });

        console.log(`${++sentEmailCount} EMAILS SENT`);
      } else {
        failedEmailResponseData.push({
          WEBSITE: response.WEBSITE,
          DATE: response.DATE,
          EMAIL: response.EMAIL,
          ERROR_MESSAGE: response.ERROR_MESSAGE,
        });

        console.log(`${++failedEmailCount} EMAILS FAILED TO SEND`);
      }

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

  if (successfulEmailResponseData.length > 0) {
    writeJsonToXlsxFile({
      jsonData: successfulEmailResponseData,
      fileName: "followups_with_ids.xlsx",
      worksheetHeaders: ["WEBSITE", "DATE", "EMAIL", "MESSAGE_ID"],
    });
  }

  if (failedEmailResponseData.length > 0) {
    writeJsonToXlsxFile({
      jsonData: failedEmailResponseData,
      fileName: "followups_with_errors.xlsx",
      worksheetHeaders: ["WEBSITE", "DATE", "EMAIL", "ERROR_MESSAGE"],
    });
  }
};

main();
