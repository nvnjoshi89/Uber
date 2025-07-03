const captainModel = require('../models/captain.model');

// const user = {
//   name: "Alice",
//   age: 25,
//   email: "alice@example.com"
// };

// // 🔽 Without destructuring:
// const name = user.name;
// const age = user.age;
// const email = user.email;

// // 🔽 With destructuring:
// const { name, age, email } = user;

module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    console.log("Creating captain with details:", { firstname, lastname, email, color, plate, capacity, vehicleType });

    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}