const mongoose = require("mongoose");
const Schema = mongoose.Schema();
const balanceSchema = new mongoose.Schema({
    username : {
        type : String,
        required : "Username required"
    },
    balances : {
        type : String,
        required : "Balance required"
    },
    lastUpdated : {
        type : String,
        default : Date.now()
    }
});

module.exports = mongoose.model("balances", balanceSchema);