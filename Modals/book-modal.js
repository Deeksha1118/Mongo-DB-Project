const mongoose = require("mongoose");

const Schema = mongoose.Schema; //Schema is a classname, initializing Schema

const bookSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    genre : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    publisher : {
        type : String,
        required : true,
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("Book", bookSchema);   //even if u write plural here by default it takes singular