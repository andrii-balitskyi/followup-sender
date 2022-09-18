import xlsx from "xlsx";
import { xlsxToJson } from "./xlsx-to-json.js";
import path from "path";

export const jsonToXlsx = (json) => {
  const followupsData = xlsxToJson(path.resolve("followups_with_ids.xlsx"));
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet([...json, ...followupsData], {
    header: ["WEBSITE", "DATE", "EMAIL", "MESSAGE_ID"],
  });

  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  xlsx.writeFileXLSX(workbook, "followups_with_ids.xlsx");
  console.log("XLSX FILE CREATED");
};

export default jsonToXlsx;
