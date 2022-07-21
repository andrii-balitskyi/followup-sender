import xlsx from "xlsx";

export const xlsxToJson = (pathToXlsxFile) => {
  const xl = xlsx.readFile(pathToXlsxFile);
  const firstSheet = xl.Sheets["Sheet1"];
  const jsonedSheet = xlsx.utils.sheet_to_json(firstSheet);

  return jsonedSheet;
};

export default xlsxToJson;
