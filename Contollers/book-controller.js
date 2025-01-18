const { BookModal, UserModal } = require("../Modals/index");
const IssuedBook = require("../Dtos/book-dto.js");

exports.getAllBooks = async(req, res) => {
    const books = await BookModal.find();

    if(books.length === 0) {
        return res.status(404).json({
            success : false,
            message : "No Book Found",
        });
    }
    res.status(200).json({
        success : true,
        message : "Book Found !!",
        data : books,
    })
};

exports.getSingleBookById = async(req, res) => {
    const {id} = req.params;
    const book = await BookModal.findById(id);

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
};

exports.getAllIssuedBooks = async(req, res) => {
    const users = await UserModal.find({
        issuedBook : {$exists : true},    // exists is a keyword
    }).populate("issuedBook");

    // Data Transfer Object (dto)

    const issuedBooks = users.map((each) => new IssuedBook(each));

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
};

exports.addNewBook = async(req, res) => {
    const {data} = req.body;

    if(!data) {
        return res.status(404).json({
            success : false,
            message : "No data to add a book",
        });
    }

    await BookModal.create(data);           //creating or addind a new row
    const allBooks = await BookModal.find();
    return res.status(201).json({
        success : true,
        message : "Book Added Successfully !!",
        data : allBooks,
    });
};

exports.updateBookById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModal.findOneAndUpdate(
    {
        _id : id,
    },
    data, 
    {
        new : true,       //to find the updated data
    });
    return res.status(200).json({
        success : true,
        message : "Book Updated!!",
        data : updatedBook,    
    });
};

// you can also export like this
// const getAllBooks = () => {};
// const getSingleBookById = () => {};

// module.exports = {getAllBooks, getSingleBookById};