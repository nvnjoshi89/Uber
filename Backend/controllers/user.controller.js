// we will create the routes but logic of that route is written in the controller.

const userService = require("../Services/user.service")
const { validationResult } = require("express-validator")
const userModel = require("../models/user.model")

// Register user
module.exports.registerUser = async (req, res, next) => {
    //if the errors comes while validating the input data in userroutes we handle it here. if the errors comes through validation we get it throug req of validationResult.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password } = req.body
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user })
}
