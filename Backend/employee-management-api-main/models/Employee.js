const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
    Course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    Specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialization"
    },
    Institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution"
    },
    Grade: Number
});

const WorkExperienceSchema = new mongoose.Schema({
    Company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    LastDesignation: String,
    DurationMonths: Number,
    Remarks: String
});

const EmployeeSchema = new mongoose.Schema(
    {
        DOB: Date,
        BasicPay: Number,
        Gender: String,

        FirstName:{
            type: String,
            required: [true,"First name is required"],
            minlength: [3, "First name must be at least 3 characters"],
            maxlength: [20, "First name cannot exceed 20 characters"],
            trim: true,
            match: [/^[A-Za-z]+$/, "First name must contain only alphabetic characters"]
        },
        LastName: {
            type: String,
            required: [true,"Last name is required"],
            match: [/^[A-Za-z]+$/, "Last name must contain only alphabetic characters"]
        },

        MobileNumber: String,
        PersonalEmail: {
            type: String,
            required: [true,"Email is required"],
            unique: [true]
        },

        PostalAddress: String,
        City: String,

        Country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country"
        },

        Designation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Designation"
        },

        Education: [EducationSchema],

        WorkExperience: [WorkExperienceSchema]
    },
    {
        collection: "Employees"
    }
);

// Adding validation as first,last nd email unique
EmployeeSchema.index(
  {
    FirstName: 1
  },
  {
    unique: true
  }
);


module.exports = mongoose.model("Employee", EmployeeSchema);