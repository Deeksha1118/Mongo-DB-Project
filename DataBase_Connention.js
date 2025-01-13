const mongoose =  require("mongoose");

function DBconnection() {
    const DB_URL = process.env.MONGO_URI;

    //to create connection
    mongoose.connect(DB_URL);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));    //oning DB

db.once("open", function(){         //open a connection for database
    console.log("DB connected !!");
});

module.exports = DBconnection;
