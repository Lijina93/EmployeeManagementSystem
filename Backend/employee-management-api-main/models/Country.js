const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
    Code: String,
    Name: String
});

module.exports = mongoose.model(
    "Country",
    CountrySchema,
    "Countries"
);