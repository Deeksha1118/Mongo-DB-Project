const express = require("express");
const dotenv = require("dotenv");

const usersRouter = require("./Routes/users.js");
const booksRouter = require("./Routes/books.js");

const DBconnection = require("./DataBase_Connention.js");

dotenv.config();  //activate ur .env file

const app = express();

DBconnection();

const PORT = 8081;

app.use(express.json());

// http://localhost:8081/
app.get("/",(req,res) => {
    res.status(200).json({
        message : "Server is up and Running!!",
    });
});

// http://localhost:8081/users
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req,res) => {
    res.status(404).json({
        message : "This route doesn't exists.",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});