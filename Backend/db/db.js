const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to DB');

    }).catch((err) => {
        console.log('DB connection error', err);

    })
}

module.exports = connectToDb;