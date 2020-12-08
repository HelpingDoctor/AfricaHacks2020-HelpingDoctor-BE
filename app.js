const express = require("express");
const bodyParser = require("body-parser");

const nurseRoutes = require("./routes/nurse-routes");

const app = express();

app.use("/api/nurse-dashboard", nurseRoutes);

app.listen(5000);
