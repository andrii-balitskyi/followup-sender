export const formatEmail = (email) => {
  const emailArray = Array.isArray(email) ? email : [email];

  let formattedEmails = emailArray.map((e) =>
    e.includes('"') ? e.replace(/"/g, "").trim() : e.trim()
  );

  if (formattedEmails[0].includes("<")) {
    formattedEmails = formattedEmails.map((e) => e.split("<")[0].trim());
  }

  return formattedEmails;
};

export default formatEmail;
