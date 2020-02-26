const express = require("express");

const app = express();

app.use(require("./providers"));
app.use(require("./specialties"));

module.exports = app;
