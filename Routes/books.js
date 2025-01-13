const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/users.json");
const {getAllBooks, getSingleBookById, getAllIssuedBooks} = require("../Contollers/book-controller.js");


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

router.post("/", (req,res) => {
    const {data} = req.body;

    if(!data) {
        return res.status(404).json({
            success : false,
            message : "No data to add a book",
        });
    }

    const book = books.find((each) => each.id === data.id);
    if(book) {
        return res.status(404).json({
            success : false,
            message : "Id Already Exists !!",
        });
    }

    //... books we used to extend what we added orelse we can only give data that only shows what we added.
    const allBooks = {...books, data}; 
    return res.status(201).json({
        success : true,
        message : "Book Added Successfully !!",
        data : allBooks,
    });
});

// Route: /:id
// Method: PUT
// Description: Updating a book by their id
// Access: Public
// Parameters: ID
// Data : id, name, author, genre, price, publisher

router.put("/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);
    if(!book) {
        return res.status(404).json({
            success : false,
            message : "Book Doesn't Exist !!",
        });
    }
    
    const updateBookData = books.map((each) => {
        if(each.id === id){
            return {
                ...each,   //each data
                ...data,   //data we write in body
            };
        }
        return each;
    });
    return res.status(200).json({
        success : true,
        message : "Book Updated!!",
        data : updateBookData,    
    });
});


module.exports = router;