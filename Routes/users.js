const express = require("express");
const {users} = require("../Data/users.json");
const{getAllUsers, getSingleUserById, addNewUser, updateUserById, deleteUserById} = require("../Contollers/user-controller.js");

const { BookModal, UserModal } = require("../Modals/index");

const router = express.Router();


// Route: /
// Method: GET
// Description: Get all users
// Access: Public
// Parameters: None

const { Router } = require("express");

// http://localhost:8081/users
router.get("/", getAllUsers);

// Route: /:id
// Method: GET
// Description: Get single user by their id
// Access: Public
// Parameters: id

// http://localhost:8081/users/id
router.get("/:id", getSingleUserById);

// Route: /
// Method: POST
// Description: Creating a new user
// Access: Public
// Parameters: None
// Data: id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate

// http://localhost:8081/users
router.post("/", addNewUser);

// Route: /:id
// Method: PUT
// Description: Updating a user by their id
// Access: Public
// Parameters: ID
// Data: id, name, surname, email, issuedBook, issuedDate, returnDate, subscriptionType, subscriptionDate

router.put("/:id", updateUserById);

// Route: /:id
// Method: DELETE
// Description: Deleting a user by their id
// Access: Public
// Parameters: ID

router.delete("/:id", deleteUserById);

module.exports = router;