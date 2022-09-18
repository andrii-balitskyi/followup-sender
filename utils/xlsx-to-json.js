import xlsx from "xlsx";
import fs from "fs";

export const xlsxToJson = (pathToXlsxFile) => {
  if (!fs.existsSync(pathToXlsxFile)) return [];

  const xl = xlsx.readFile(pathToXlsxFile);
  const firstSheet = xl.Sheets["Sheet1"];
  const jsonedSheet = xlsx.utils.sheet_to_json(firstSheet);

  return jsonedSheet;
};

export default xlsxToJson;
