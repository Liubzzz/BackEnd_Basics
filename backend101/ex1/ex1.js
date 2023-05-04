const csvtojson = require("csvtojson");
const fs = require("fs");

const csvFilePath = "ex1.csv";
const jsonFilePath = "ex1.json";

async function convertCsvToJson() {
  try {
    const jsonArray = await csvtojson().fromFile(csvFilePath);
    await fs.promises.writeFile(jsonFilePath, JSON.stringify(jsonArray));
    console.log(
      `CSV file '${csvFilePath}' has been converted to JSON and written to file '${jsonFilePath}'`
    );
  } catch (error) {
    console.error(
      `Failed to convert CSV file '${csvFilePath}' to JSON:`,
      error
    );
  }
}

convertCsvToJson();

// CU EXPRESS

// const express = require("express");
// const csvtojson = require("csvtojson");
// const fs = require("fs");

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.post("/convert", async (req, res) => {
//   const csvFilePath = req.body.csvFilePath;
//   const jsonFilePath = req.body.jsonFilePath;

//   try {
//     const jsonArray = await csvtojson().fromFile(csvFilePath);
//     await fs.promises.writeFile(jsonFilePath, JSON.stringify(jsonArray));
//     res.send(`CSV file '${csvFilePath}' has been converted to JSON and written to file '${jsonFilePath}'`);
//   } catch (error) {
//     console.error(`Failed to convert CSV file '${csvFilePath}' to JSON:`, error);
//     res.status(500).send(`Failed to convert CSV file '${csvFilePath}' to JSON: ${error.message}`);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
