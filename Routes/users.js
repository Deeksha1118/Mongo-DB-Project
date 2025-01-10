const express = require("express");
const {users} = require("../Data/users.json");

const router = express.Router();


// Route: /
// Method: GET
// Description: Get all users
// Access: Public
// Parameters: None

const { Router } = require("express");

// http://localhost:8081/users
router.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        message : "Got all the Users",
        data: users,
    });
});

// Route: /:id
// Method: GET
// Description: Get single user by their id
// Access: Public
// Parameters: id

// http://localhost:8081/users/id
router.get("/:id",(req,res) => {
    // const id = req.params.id;
    const {id} = req.params;
    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User Doesn't Exist !!",
        });
    }
    return res.status(200).json({
        success : true,
        message : "User Found",
        data : user,
    });
});

// Route: /
// Method: POST
// Description: Creating a new user
// Access: Public
// Parameters: None
// Data: id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate

// http://localhost:8081/users
router.post("/", (req,res) => {
    const {id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);
    if(user) {
        return res.status(404).json({
            success : false,
            message : "User Already Exixts",
        });
    }

    users.push({
        id, 
        name, 
        surname, 
        email, 
        issuedBook, 
        issuedDate, 
        returnDate, 
        subscriptionType, 
        subscriptionDate,
    });
    return res.status(201).json({
        success : true,
        message : "User Added Successfully!!",
        data : users,
    });
});

// Route: /:id
// Method: PUT
// Description: Updating a user by their id
// Access: Public
// Parameters: ID
// Data: id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate

router.put("/:id", (req,res) => {
   const {id} = req.params;
   const {data} = req.body;
   
   const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User Doesn't Exist !!",
        });
    }
    const updateUserData = users.map((each) => {
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
        message : "User Updated!!",
        data : updateUserData,    
    });
});

// Route: /:id
// Method: DELETE
// Description: Deleting a user by their id
// Access: Public
// Parameters: ID

router.delete("/:id", (req,res) => {
    const {id} = req.params;

    const user = users.find((each) => each.id === id);
    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User Doesn't Exist !!",
        });
    }   
    const index = users.indexOf(user);    //here users is array
    users.splice(index, 1);

    return res.status(200).json({
        success : true,
        message : "User got deleted...",
        data : users,
    });
});

// Route: /subscription-details/:id
// Method: GET
// Description: Get all user subscription details
// Access: Public
// Parameters: ID

router.get("/subscription-details/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User Not Found",
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data === "") {
            date = new Date();    //current date
        }
        else {
            date = new Date(data);    // date that we give
        }
        // to get to know how many days
        let days = Math.floor(data / (1000 * 60 * 60 * 24));  //floor(2.7) = 2  // (milesec * sec * min * hr)
        return days;
    };

    const subscriptionType = (date) => {
        if(user.subscriptionType = "Basic") {
            date = date + 90;
        }
        else if(user.subscriptionType = "Standard") {
            date = date + 180;
        }
        else if(user.subscriptionType = "Premium") {
            date = date + 365;
        }
        return date;
    };
});

module.exports = router;