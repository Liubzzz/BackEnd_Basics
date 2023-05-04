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

//CU EXPRESS

//   const express = require("express");
// const https = require("https");
// const fs = require("fs").promises;

// const app = express();
// const url = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

// app.get("/", async (req, res) => {
//   https.get(url, async (httpsRes) => {
//     let data = "";
//     for await (const info of httpsRes) {
//       data += info;
//     }

//     try {
//       await fs.writeFile("ex3.txt", data);
//       res.send("File was successfully saved.");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   }).on("error", (err) => {
//     console.error("Error: ", err.message);
//     res.status(500).send("Internal Server Error");
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
