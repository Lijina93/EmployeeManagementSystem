const mongoose = require("mongoose");

const DesignationSchema = new mongoose.Schema({
    Name: String
});

module.exports = mongoose.model(
    "Designation",
    DesignationSchema,
    "Designations"
);