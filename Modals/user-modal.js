const mongoose = require("mongoose");

const Schema = mongoose.Schema; //Schema is a classname, initializing Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    surname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    issuedBook : {
        type : mongoose.Schema.Types.ObjectId,  //auto generated id will be present here =>objectId
        ref : "Book",                           // refering table (Book)
        required : false,
    },
    returnDate : {
        type : String,
        required : false,  // if user didnt purchase any book
    },
    subscriptionType : {
        type : String,
        required : true,
    },
    subscriptionDate : {
        type : String,
        required : true,
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("User", userSchema);