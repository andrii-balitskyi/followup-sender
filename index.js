import xlsxToJson from "./utils/xlsx-to-json.js";
import path from "path";
import sendFollowup from "./utils/send-followup.js";
import formatWebsite from "./utils/format-website.js";

if (!["1", "2", "3", "4"].includes(process.argv[2])) {
  throw new Error("Unknown followup number");
}

const main = () => {
  const sitesToEmails = xlsxToJson(path.resolve("followups.xlsx"));
  const followupNumber = process.argv[2];

  for (const { WEBSITE, EMAIL } of sitesToEmails) {
    let email = EMAIL.trim();
    const website = formatWebsite(WEBSITE);
    email = email.includes(",") ? email.split(",") : email;

    if (typeof email === "string") {
      sendFollowup({ to: email, followupNumber, website });

      continue;
    }

    if (Array.isArray(email)) {
      email = email.map((e) =>
        e.includes('"') ? e.replace(/"/g, "").trim() : e.trim()
      );
    }

    if (email[0].includes("<")) {
      email = email.map((e) => e.split("<")[0].trim());
    }

    for (const e of email) {
      sendFollowup({ to: e, followupNumber, website });
    }
  }
};

main();
