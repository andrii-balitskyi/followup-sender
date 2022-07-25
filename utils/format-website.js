const extractWebsiteName = (str, splitBy) => {
  return str.split(splitBy)[1].split(".")[0];
};

export const formatWebsite = (website) => {
  const splitCases = {
    1: "www.",
    2: "https://www.",
    3: "https://",
    4: "http://www.",
    5: "http://",
  };

  switch (true) {
    case website.startsWith(splitCases[1]):
      return extractWebsiteName(website, splitCases[1]);

    case website.startsWith(splitCases[2]):
      return extractWebsiteName(website, splitCases[2]);

    case website.startsWith(splitCases[3]):
      return extractWebsiteName(website, splitCases[3]);

    case website.startsWith(splitCases[4]):
      return extractWebsiteName(website, splitCases[4]);

    case website.startsWith(splitCases[5]):
      return extractWebsiteName(website, splitCases[5]);

    default:
      return website.split(".")[0];
  }
};

export default formatWebsite;
