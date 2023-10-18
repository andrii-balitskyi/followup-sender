import xlsx from "xlsx";
import { xlsxToJson } from "./xlsx-to-json.js";
import path from "path";

export const writeJsonToXlsxFile = ({
  jsonData,
  filePath,
  worksheetHeaders,
}) => {
  const existingXlsxData = xlsxToJson(path.resolve(filePath));
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(
    [...existingXlsxData, ...jsonData],
    {
      header: worksheetHeaders,
    }
  );

  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  xlsx.writeFileXLSX(workbook, filePath);
  console.log(`${filePath} FILE CREATED`);
};

export default writeJsonToXlsxFile;
