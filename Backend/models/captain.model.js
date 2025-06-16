const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters Long"],
        },
        lastname: {
            type: String,
            minLength: [3, "Last name must be at least 3 characters Long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        mathc: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vechile: {
        color: {
            type: String,
            required: true,
            minLength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vechileType: {
            type: String,
            enum: ['car', 'motorcyle', 'auto'],
            required: true
        }
    },
    location: {
        lat: {
            type: Number,

        },
        lng: {
            type: Number,
        }
    }
})

// creating custom methods on captainSchema\
captainSchema.methods.generateAuthTOken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}
captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;
