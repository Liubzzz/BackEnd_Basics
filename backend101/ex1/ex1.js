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
