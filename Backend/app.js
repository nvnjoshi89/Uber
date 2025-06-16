const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser")
const cors = require("cors")
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')

//calling function to connect to database
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware that interacts with cookies in our server
app.use(cookieparser())

app.get("/", (req, res) => {
    res.send("hello world");

})
app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
module.exports = app;