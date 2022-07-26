import nodemailer from "nodemailer";

export const getGmailClient = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    pool: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

export default getGmailClient;
