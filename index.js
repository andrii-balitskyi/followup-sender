import xlsxToJson from "./utils/xlsx-to-json.js";
import path from "path";
import sendFollowup from "./utils/send-followup.js";
import formatWebsite from "./utils/format-website.js";
import nodemailer from "nodemailer";

if (!["1", "2", "3", "4"].includes(process.argv[2])) {
  throw new Error("Unknown followup number");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const main = async () => {
  const sitesToEmails = xlsxToJson(path.resolve("followups.xlsx"));
  const followupNumber = process.argv[2];

  const emailClient = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    pool: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  for (const { WEBSITE, EMAIL } of sitesToEmails) {
    let email = EMAIL.trim();
    console.log(WEBSITE);
    const website = formatWebsite(WEBSITE);
    console.log(`WEBSITE: ${website}`);
    email = email.includes(",") ? email.split(",") : email;

    if (typeof email === "string") {
      console.log(`EMAIL: ${email}`);
      sendFollowup({ to: email, followupNumber, website, emailClient });
      await sleep(1000);

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
      console.log(`EMAIL: ${e}`);
      sendFollowup({ to: e, followupNumber, website, emailClient });
      await sleep(1000);
    }
  }

  emailClient.close();
};

main();
