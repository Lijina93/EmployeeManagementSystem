const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
    Name: String,
    Code: String
});

module.exports = mongoose.model(
    "Institution",
    InstitutionSchema,
    "EducationalInstitutions"
);
