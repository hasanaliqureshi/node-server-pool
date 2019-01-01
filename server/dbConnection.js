const mongoose = require("mongoose");
const config = require("./config/config");

const URI = config.mongoURI;
mongoose.connect(URI, {"userNewUrlParser" : true});

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected!");
});

mongoose.connection.on("error", err => {
    console.log("MongoDB Error : " + err);
});