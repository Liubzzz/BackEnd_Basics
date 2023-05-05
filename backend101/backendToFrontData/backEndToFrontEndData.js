const express = require("express");

const bookRoomApp = express();
var cors = require("cors");

bookRoomApp.use(cors());

bookRoomApp.get("/meetingRoomData", (req, res) => {
  const data = require("./meetingRoomData.json");
  res.json(data.roomdata);
});
bookRoomApp.listen(3001, () =>
  console.log(`Server running at http://localhost:3001`)
);
