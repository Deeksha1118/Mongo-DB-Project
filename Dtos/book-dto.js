// Data Transfer object - Book , this is our object

class IssuedBook {
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    //whenever we create obj, the constructor get invoked(called), here we have paramaterized constructor 
    constructor(user) {                               //this is how we are transfering data from user object to the book object
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.issuedBy;               // bcz we r directly taking from user.json
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
} 


module.exports = IssuedBook;