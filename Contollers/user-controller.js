const { BookModal, UserModal } = require("../Modals/index");

exports.getAllUsers = async(req, res) => {
    const users = await UserModal.find();

    if(users.length === 0) {
        return res.status(404).json({
            success : false,
            message : "No Users found in the Database !!",
        });
    }
    res.status(200).json({
        success: true,
        message : "Got all the Users",
        data: users,
    });
};

exports.getSingleUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModal.findById(id);

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
};

exports.addNewUser = async(req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const newUser = await UserModal.create({
        name, 
        surname, 
        email, 
        subscriptionType, 
        subscriptionDate,
    });
    return res.status(201).json({
        success : true,
        message : "User Added Successfully!!",
        data : newUser,
    });
};

exports.updateUserById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const updatedUserData = await UserModal.findOneAndUpdate(
        {
            _id : id,
        }, 
        {
            $set : {
                ...data,
            }
        }, 
        {
            new : true,
        });
        return res.status(200).json({
            success : true,
            message : "User Updated!!",
            data : updatedUserData,   
        });
};

exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const user = await UserModal.deleteOne({_id : id});

    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User Doesn't Exist !!",
        });
    } 
    return res.status(200).json({
        success : true,
        message : "User got deleted...",
        data : user,
    });
};