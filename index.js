const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "150mb", extended: false }));
app.use(bodyParser.json({ limit: "150mb" }));

const MailNotifier = require("./mailNotifier/mailNotifier")
const mailNotifier = new MailNotifier();
app.listen(8888, () => {
    console.log("server listing at 8888");
})