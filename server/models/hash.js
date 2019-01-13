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
    'userid' : {
        type : String
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
        hashRate : Number
    }],
    difficulty : {
        type : Number,
        required : "Missing Arguments"
    },
    is_rewarded : {
        type : Boolean,
        default : false
    },
    total_reward : {
        type : Number,
        default : 0
    },
    last_updated : {
        type : Date
    },
    datetime : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('hashes', hashSchema);