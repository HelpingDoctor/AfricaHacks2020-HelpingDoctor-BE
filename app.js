const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();

// Passport Config
require('./src/config/doctorPassport')
require('./src/config/nursePassport')

// db config and constants
const config = require("./src/config/constant");
const database = require("./src/config/database");

// express bodyParser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const doctorRoutes = require("./src/routes/doctorRoutes")
const nurseRoutes = require("./src/routes/nurseRoutes")

app.use("/api/v1/nurse", nurseRoutes)
app.use("/api/v1/doctor", doctorRoutes)


const PORT = config.port;
const dbURL = process.env.NODE_ENV==='production' ? process.env.MONGODB_URI : process.env.MONGODB_URI

app.listen(PORT, () => {
  database()
  console.log("server listening on", {PORT})
});
