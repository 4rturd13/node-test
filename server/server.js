require("dotenv").config();
require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("./routes/user"));

app.use(bodyParser.json());

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
});
