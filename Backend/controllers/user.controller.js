// we will create the routes but logic of that route is written in the controller.

const userService = require("../Services/user.service")
const { validationResult } = require("express-validator")
const userModel = require("../models/user.model")
const BlacklistTokenModel = require("../models/blacklistToken.model")

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


//login controller

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or  password"
        })
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)

    res.status(200).json({ token, user });

}


//user profile controller
module.exports.getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user)
}

//logout user controller
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await BlacklistTokenModel.create({ token })
    res.status(200).json({ message: "Logged out" })
}