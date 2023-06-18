const dotenv = require("dotenv");
dotenv.config();

console.log(`Your API key is ${process.env.API_ID}`);

var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mockAPIResponse = require("./mockAPI.js");

const app = express();
const cors = require("cors");
console.log(__dirname);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

/**
 * POST METHOD SERVER
 */
let userInput = [];
app.post("/api", async function (req, res) {
  userInput = req.body.url;
  console.log("user input: ", userInput);
  const apiRequestURL = `${process.env.API_ID}?key=${process.env.API_KEY}&url=${userInput}&lang=en`;
  console.log(apiRequestURL);
  const response = await fetch(apiRequestURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
