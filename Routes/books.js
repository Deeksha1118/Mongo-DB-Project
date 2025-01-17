const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/users.json");
const {getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById} = require("../Contollers/book-controller.js");


const { BookModal, UserModal } = require("../Modals/index");

const router = express.Router();

// Route: /
// Method: GET
// Description: Get all books
// Access: Public
// Parameters: None

router.get("/", getAllBooks);

// Route: /books/issued
// Method: GET
// Description: Get all issued books
// Access: Public
// Parameters: None

router.get("/issued", getAllIssuedBooks);

// Route: /:id
// Method: GET
// Description: Get single book by their id
// Access: Public
// Parameters: id

router.get("/:id", getSingleBookById);

// Route: /
// Method: POST
// Description: Creating a new book
// Access: Public
// Parameters: None
// Data : id, name, author, genre, price, publisher

router.post("/", addNewBook);

// Route: /:id
// Method: PUT
// Description: Updating a book by their id
// Access: Public
// Parameters: ID
// Data : id, name, author, genre, price, publisher

router.put("/:id", updateBookById);


module.exports = router;