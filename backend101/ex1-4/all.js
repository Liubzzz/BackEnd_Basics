const csvtojson = require("csvtojson");
const fs = require("fs");
const http = require("http");
const https = require("https");
const fs1 = require("fs").promises;

const fisierCsv = "prob1.csv";
const url = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

const host = "localhost";
const port = "3005";

//rezolvare ex 1
const ex1 = () => {
  const csvFilePath = "ex1.csv";
  const jsonFilePath = "ex1.json";

  async function convertCsvToJson() {
    try {
      const jsonArray = await csvtojson().fromFile(csvFilePath);
      await fs1.promises.writeFile(jsonFilePath, JSON.stringify(jsonArray));
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
};

//rezolvare ex 2
const server = http.createServer((req, res) => {
  if (req.url === "/1") {
    ex1();
    fs.readFile("./ex1.json", "UTF-8", (err, json) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(json);
    });
    return;
  }

  if (req.url === "/2") {
    fs.readFile("./ex2.html", "UTF-8", (err, html) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    });
    return;
  }

  if (req.url === "/3") {
    ex3();
    fs.readFile("./ex3.json", "UTF-8", (err, json) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(json);
      return;
    });
  }

  if (req.url === "/4") {
    ex4();
    fs.readFile("./ex4.csv", "UTF-8", (err, text) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(text);
    });
    return;
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

//rezolvare ex3
const ex3 = () => {
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
};

//prob4
const ex4 = () => {
  const csvFilePath = "ex4.csv";

  function csvToJson(csvFilePath) {
    return new Promise((resolve, reject) => {
      csvtojson()
        .fromFile(csvFilePath)
        .then((json) => {
          fs.writeFile("ex4.json", JSON.stringify(json), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(json);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return new Promise((res, rej) => {
    csvToJson(csvFilePath)
      .then((json) => {
        console.log(json);
        res(json);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
};
