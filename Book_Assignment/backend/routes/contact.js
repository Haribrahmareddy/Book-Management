const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");


router.post("/", (req, res) => {
  const { name, mobile, message } = req.body;
  const workbook = new ExcelJS.Workbook();
  const filePath = "./db/contacts.xlsx";

  workbook.xlsx.readFile(filePath).then(() => {
    const worksheet = workbook.getWorksheet(1);
    worksheet.addRow([name, mobile, message]);
    workbook.xlsx.writeFile(filePath).then(() => {
      res.json({ message: "Contact saved successfully." });
    });
  }).catch(() => {
    
    const worksheet = workbook.addWorksheet("Contacts");
    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Mobile", key: "mobile" },
      { header: "Message", key: "message" },
    ];
    worksheet.addRow([name, mobile, message]);
    workbook.xlsx.writeFile(filePath).then(() => {
      res.json({ message: "Contact saved successfully." });
    });
  });
});

module.exports = router;
