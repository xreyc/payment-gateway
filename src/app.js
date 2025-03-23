const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mainRoutes = require("./routes/mainRoute");
const paymentRoutes = require("./routes/paymentRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/** Routes */
app.use("/", mainRoutes);
app.use("/v1/pay", paymentRoutes);

module.exports = app;
