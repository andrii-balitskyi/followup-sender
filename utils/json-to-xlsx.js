import xlsx from "xlsx";
import { xlsxToJson } from "./xlsx-to-json.js";
import path from "path";

export const writeJsonToXlsxFile = ({
  jsonData,
  fileName,
  worksheetHeaders,
}) => {
  const existingXlsxData = xlsxToJson(path.resolve(fileName));
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(
    [...existingXlsxData, ...jsonData],
    {
      header: worksheetHeaders,
    }
  );

  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  xlsx.writeFileXLSX(workbook, fileName);
  console.log(`${fileName} FILE CREATED`);
};

export default writeJsonToXlsxFile;
