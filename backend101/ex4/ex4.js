// Commented lines work, i wrote in different modes, for understanding purposes

const csvtojson = require("csvtojson");
const fs = require("fs");

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

// const csvtojson = require("csvtojson");

// function csvToJson(csvFilePath) {
//   return new Promise((resolve, reject) => {
//     csvtojson()
//       .fromFile(csvFilePath)
//       .then((jsonArray) => {
//         resolve(jsonArray);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// csvToJson("ex4.csv")
//   .then((jsonArray) => {
//     return new Promise((resolve, reject) => {
//       const jsonStr = JSON.stringify(jsonArray);
//       resolve(jsonStr);
//     });
//   })
//   .then((jsonStr) => {
//     console.log(jsonStr);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const csvtojson = require("csvtojson");
// const fs = require("fs");

// const filePath = "ex4.csv";

// async function convertCsvToJson(filePath) {
//   try {
//     const jsonArray = await csvtojson().fromFile(filePath);
//     await fs.promises.writeFile("ex4.json", JSON.stringify(jsonArray));
//     console.log(jsonArray);
//     return jsonArray;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// convertCsvToJson(filePath);
