const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/users.json");

const router = express.Router();

// Route: /
// Method: GET
// Description: Get all books
// Access: Public
// Parameters: None

router.get("/", (req,res) => {
    res.status(200).json({
        success : true,
        message : "Got all the books",
        data : books,
    });
});

// Route: /books/issued
// Method: GET
// Description: Get all issued books
// Access: Public
// Parameters: None

router.get("/issued", (req,res) => {
    const userWithIssuedBook = users.filter((each) => {  //we are not using single user thats why we use filter
        if(each.issuedBook) return each;
    });
    
    const issuedBooks = [];    //store all the issuedBook
    userWithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success : false,
            message : "No Book Have Been Issued Yet..",
        });
    }
    return res.status(200).json({
        success : true,
        message : "Users with the issued Books...",
        data : issuedBooks,  
    });
});

// Route: /:id
// Method: GET
// Description: Get single book by their id
// Access: Public
// Parameters: id

router.get("/:id", (req,res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id)
    if(!book) {
        return res.status(404).json({
            success : false,
            message : "Book Doesn't Exist !!",
        });
    }
    return res.status(200).json({
        success : true,
        message : "Book Found by their ID",
        data : book,
    });
});

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