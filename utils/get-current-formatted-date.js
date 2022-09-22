export const getCurrentFormattedDate = (customDate) => {
  let date = new Date();

  if (customDate) {
    date =
      customDate?.length === 5
        ? new Date(ExcelDateToJSDate(customDate))
        : new Date(customDate);
  }

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "." + mm + "." + yyyy;
};

export const ExcelDateToJSDate = (date) => {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
};

export default getCurrentFormattedDate;
