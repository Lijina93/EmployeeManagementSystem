const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
    Name: String
});

module.exports = mongoose.model(
    "Course",
    CoursesSchema,
    "Courses"
);
