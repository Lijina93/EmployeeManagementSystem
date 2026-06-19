const mongoose = require("mongoose");
const Employee = require("../models/Employee");

async function connectDB() {
    try {

        const mongoUri =`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        await mongoose.connect(mongoUri);

        console.log("MongoDB Connected");

        await Employee.syncIndexes();
      
        console.log("Employee indexes synced");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

module.exports = mongoose;