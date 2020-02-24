require("dotenv").config();
require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routes/user"));

const port = process.env.PORT || 8080;

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(port, () => {
    console.log(`Listening on port:, ${port}`);
});
