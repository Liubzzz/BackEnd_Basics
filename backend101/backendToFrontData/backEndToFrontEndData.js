// const express = require("express");
// const fs = require("fs");

// const roomName = express();
// const port = 3001;

// roomName.get("/meetingRoomData", (req, res) => {
//   fs.readFile("./meetingRoomData.json", "utf8", (err, data) => {
//     if (err) throw err;
//     res.json(JSON.parse(data));
//   });
// });

// roomName.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });

const express = require("express");
const roomName= express();
const port = 3001;

roomName.get("/meetingRoomData", (req, res) => {
  const data = require("./meetingRoomData.json");
  res.json(data.roomdata);
});

roomName.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
