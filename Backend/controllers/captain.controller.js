const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../Services/captain.service');

// Register captain
module.exports.registerCaptain = async (req, res, next) => {
    // Check for validataion errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vechile } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exists with this email" })
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vechile.color,
        plate: vechile.plate,
        capacity: vechile.capacity,
        vechileType: vechile.vechileType

    })
    const token = captain.generateAuthTOken();
    res.status(201).json({
        token,
        captain
    })
}


