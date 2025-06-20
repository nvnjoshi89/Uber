const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

//Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...  
// .split(' ') This splits the string at the space character ' ' gives you an array: ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6..."]



// this is the function but You are not exporting the function directly. Instead, you're exporting it as a named property of an object { authUser: [Function] }
module.exports.authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token });


    if (isBlackListed) {
        res.status(401).json({ message: "Unauthorized blacklisted token." })
    }

    try {
        //while decoding if we get error like fake token we go to catch
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlackListed = await blacklistTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized blacklisted token." })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain
        return next()

    } catch (error) {

        res.status(401).json({ message: "Unauthorized" });
    }



}
