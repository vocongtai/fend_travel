const dotenv = require("dotenv");
dotenv.config();


var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
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
 * POST GEONAME METHOD SERVER
 */
let userInput = [];
app.post("/geoname", async function (req, res) {
  userInput = req.body.location;
  console.log("user input: ", userInput);
  const apiRequestURL = `${process.env.APIGeoName_ID}q=${userInput}&maxRows=10&username=${process.env.APIGeoName_KEY}`;
  console.log(apiRequestURL);
  const response = await fetch(apiRequestURL);
  const data = await response.json();
  console.log(data);
  res.send(data);
});

/**
 * Weahter API Method SERVER
 *
 */
let lat = "";
let long = "";
let city = "";
app.post("/weather", async function (req, res) {
  lat = req.body.lat;
  long = req.body.long;
  city = req.body.city;
  console.log(`lat: ${lat} long: ${long} city: ${city}`);
  const weatherRequest = `${process.env.APIWeather_ID}lat=${lat}&lon=${long}&city=${city}&key=${process.env.APIWeather_KEY}`;
  console.log(weatherRequest);
  const response = await fetch(weatherRequest);
  const data = await response.json();
  console.log(data);
  res.send(data);
});


/**
 * API Pixabay METHOD Server
 *
 */
let place=[];
app.post('/pixabay', async function(req,res){
  place=req.body.place;
  console.log(`place: ${place}`);
  const pixabayRequest= `${process.env.APIPixabay_ID}?key=${process.env.APIPixabay_KEY}&q=${encodeURIComponent(place)}`
  console.log(pixabayRequest);
  const response=await fetch(pixabayRequest);
  const data=await response.json();
  console.log(data);
  res.send(data);
})

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
