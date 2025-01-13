const { BookModal, UserModal } = require("../Modals/index");

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

exports.getAllIssuedBooks = async(req, res) => {};

// you can also export like this
// const getAllBooks = () => {};
// const getSingleBookById = () => {};

// module.exports = {getAllBooks, getSingleBookById};