const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in second
    }
})

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema)