const express = require("express");
const app = express();
const morgan = require("morgan");
const indexRoute = require("./route/index");
const removeEmptyProperties = require("./helper/removeEmptyProperties");

app.use(removeEmptyProperties());
app.use(morgan("tiny"));

app.use("/", indexRoute);

module.exports = app;
