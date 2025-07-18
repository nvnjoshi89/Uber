const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minLength: [3, 'First name must be at least 3 characters long']
        }

    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long']

    },
    password: {
        type: String,
        required: true,
        // by doing select false if we fidn use this field will be ignored
        select: false
    },
    socketId: {
        type: String,
    }
})

// creating custom methods on userSchema
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

//creating user model. collection name is user and schema is userSchema
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;