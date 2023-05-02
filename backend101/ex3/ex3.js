const https = require("https");
const fs = require("fs/promises");

const url = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

https
  .get(url, async (res) => {
    let data = "";
    for await (const info of res) {
      data = data + info;
    }

    try {
      await fs.writeFile("ex3.txt", data);
      console.log("File was successfully saved.");
    } catch (err) {
      console.error(err);
    }
  })
  .on("error", (err) => {
    console.error("Error: ", err.message);
  });
