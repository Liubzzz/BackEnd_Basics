const http = require("http");
const fs = require("fs").promises;

const hostingAt = "localhost";
const port = 3005;

const requestListener = async (req, res) => {
  try {
    if (req.url === "/") {
      const htmlPage = await fs.readFile("./ex2.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlPage);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Page not found");
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const server = http.createServer(requestListener);

server.listen(port, hostingAt, () => {
  console.log(`Server running at http://${hostingAt}:${port}/`);
});

// CU EXPRESS

// const express = require("express");
// const fs = require("fs").promises;

// const app = express();
// const port = 3005;

// app.get("/", async (req, res) => {
//   try {
//     const htmlPage = await fs.readFile("./ex2.html", "utf-8");
//     res.type("html").send(htmlPage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.use((req, res) => {
//   res.status(404).send("Page not found");
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
