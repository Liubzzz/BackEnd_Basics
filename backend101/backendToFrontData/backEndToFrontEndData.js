const express = require("express");
const fs = require("fs");

const bookRoomApp = express();
var cors = require("cors");
const morgan = require("morgan")("tiny");
const roomdb = require("./mockRooms.json");
let movies = JSON.parse(fs.readFileSync("./mockRooms.json"));

bookRoomApp.use(cors());
bookRoomApp.use(morgan);
bookRoomApp.use(express.json());

//GET

bookRoomApp.get("/meetingRoomData", (req, res) => {
  const data = require("./meetingRoomData.json");
  res.json(data.roomdata);
});
bookRoomApp.get("/allRooms", (req, res) => {
  const data1 = require("./mockRooms.json");
  res.setHeader("Cache-Control", "no-cache");
  res.json(data1.rooms);
});

bookRoomApp.get("/allRooms/:id", (req, res) => {
  const data = roomdb.rooms.filter((e) => {
    return e.id == req.params.id;
  });
  res.status(200).send(data[0]);
});

//POST

bookRoomApp.post("/allRooms", (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    lastBooked: "",
    capacity: req.body.capacity,
    id: 0,
    meetings: [],
  };
  let highestindex = 0;
  const filtereddata = roomdb.rooms.filter((e, index) => {
    if (Number(e.id) > highestindex) {
      highestindex = Number(e.id);
    }
    return e.title === data.title;
  });
  console.log(filtereddata);
  if (filtereddata.length == 0) {
    data.id = highestindex + 1;
    roomdb.rooms.push(data);
    fs.writeFile("mockRooms.json", JSON.stringify(roomdb), (err) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        res.status(200).send("Successfully added");
      }
    });
  } else {
    res.status(400).send("Duplicate name error");
  }
});

//DELETE

bookRoomApp.delete("/allRooms/:id", (req, res) => {
  const data = roomdb.rooms.filter((e) => {
    return e.id != req.params.id;
  });
  roomdb.rooms = data;
  res.set("Cache-Control", "no-cache");
  res.status(200).send("Success");
});

bookRoomApp.patch("/allRooms/:id", (req, res) => {
  const roomId = req.params.id;
  const roomIndex = roomdb.rooms.findIndex((room) => room.id === roomId);
  if (roomIndex === -1) {
    res.status(404).send("Room not found");
  } else {
    const updatedFields = {};
    if (req.body.title) {
      updatedFields.title = req.body.title;
    }
    if (req.body.description) {
      updatedFields.description = req.body.description;
    }
    if (req.body.capacity) {
      updatedFields.capacity = req.body.capacity;
    }
    Object.assign(roomdb.rooms[roomIndex], updatedFields);
    const sortedRooms = [...roomdb.rooms];
    sortedRooms.splice(roomIndex, 1);
    sortedRooms.unshift(roomdb.rooms[roomIndex]);
    roomdb.rooms = sortedRooms;
    fs.writeFile("mockRooms.json", JSON.stringify(roomdb), (err) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        res.status(200).send("Successfully updated");
      }
    });
  }
});

//START SERVER

bookRoomApp.listen(3001, () =>
  console.log(`Server running at http://localhost:3001`)
);
