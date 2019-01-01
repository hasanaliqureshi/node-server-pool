const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const hashSchema = new mongoose.Schema({
    ip : {
        type : String,
        required : 'IP Required',
    },
    is_user : {
        type : String,
        default : false
    },
    source : [{
        content : {
            type : String,
            required : "Content source required"
        },
        creator : {
            type : String,
            required : "Who is the content creator?"
        }
    }],
    hash : [{
        totalHash : Number,
        acceptedHash : Number
    }]
});

module.exports = mongoose.model('hashes', hashSchema);