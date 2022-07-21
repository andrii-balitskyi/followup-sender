import xlsxToJson from "./utils/xlsx-to-json.js";
import path from "path";
import sendFollowup from "./utils/send-followup.js";

if (!["1", "2"].includes(process.argv[2])) {
  throw new Error("Unknown followup number");
}

let sentEmailCount = 0;
const main = () => {
  const sitesToEmails = xlsxToJson(path.resolve("followups.xlsx"));
  const followupNumber = process.argv[2];

  for (const { WEBSITE, EMAIL } of sitesToEmails) {
    let email = EMAIL.trim();
    email = email.includes(",") ? email.split(",") : email;

    if (typeof email === "string") {
      sendFollowup({ to: email, followupNumber });
      sentEmailCount++;
      console.log(`${sentEmailCount} EMAILS WERE SENT`);
      continue;
    }

    if (Array.isArray(email)) {
      email = email.map((e) => e.trim());
    }

    if (email[0].includes("<")) {
      email = email.map((e) => e.split("<")[0].trim());
    }

    for (const e of email) {
      sendFollowup({ to: e, followupNumber });
      sentEmailCount++;
      console.log(`${sentEmailCount} EMAILS WERE SENT`);
    }
  }
};

main();
