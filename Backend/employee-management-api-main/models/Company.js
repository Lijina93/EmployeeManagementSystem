const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    Name: String,
    Code: String
});

module.exports = mongoose.model(
    "Company",
    CompanySchema,
    "Companies"
);