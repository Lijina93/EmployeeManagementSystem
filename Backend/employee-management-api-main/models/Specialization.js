const mongoose = require("mongoose");

const SpecializationSchema = new mongoose.Schema({
    Specialization: String
});

module.exports = mongoose.model(
    "Specialization",
    SpecializationSchema,
    "Specializations"
);
