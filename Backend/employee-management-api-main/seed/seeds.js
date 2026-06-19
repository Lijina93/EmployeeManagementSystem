const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Company = require("../models/Company");
const Country = require("../models/Country");
const Course = require("../models/Course");
const Designation = require("../models/Designation");
const Institution = require("../models/Institution");
const Specialization = require("../models/Specialization");
const user = require("../models/user");

// DB connect
mongoose.connect(`mongodb://${process.env.DB_PORT}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

const seedData = async () => {
    try {
        console.log("Seeding started...");

        // Clear old data
        await user.deleteMany();
        await Company.deleteMany();
        await Country.deleteMany();
        await Course.deleteMany();
        await Designation.deleteMany();
        await Institution.deleteMany();
        await Specialization.deleteMany();

        console.log("Clearing old documents");

        //Insert user
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const users = await user.insertMany([
            { username: "admin", password: hashedPassword }
        ]);
        console.log("Inserting user details");

        //Insert Designations
        const Companies = await Company.insertMany([
            { Name: "Infosys Ltd.", Code: "Infosys" },
            { Name: "TCS Ltd.", Code: "TCS" },
            { Name: "HCLTech Ltd.", Code: "HCLTech" },
            { Name: "Polaris Ltd.", Code: "Polaris" }
        ]);
        console.log("Inserting Companies details");

        // Insert Countries using mapped IDs
        const countries = await Country.insertMany([
            { Code: "US", Name: "United States" },
            { Code: "UK", Name: "United Kingdom" },
            { Code: "IN", Name: "India" },
            { Code: "DE", Name: "Germany" },
            { Code: "AU", Name: "Australia" },
            { Code: "ES", Name: "Spain" },
            { Code: "FR", Name: "France" }
        ]);
        console.log("Inserting Countries details");

        //Insert Courses
        const courses = await Course.insertMany([
            { Name: "B.Tech." },
            { Name: "BE" },
            { Name: "MCA" },
            { Name: "MBA" },
            { Name: "Plus Two" }
        ]);
        console.log("Inserting courses details");

        //Insert Designations
        const designations = await Designation.insertMany([
            { Name: "Software Engineer" },
            { Name: "Senior Software Engineer" },
            { Name: "Team Leader" },
            { Name: "Software Tester" },
            { Name: "Senior Software Tester" },
            { Name: "Test Lead" },
            { Name: "Project Leader" },
            { Name: "Project Manager" },
            { Name: "Vice President" }
        ]);
        console.log("Inserting designations details");

        //Insert institutions
        const institutions = await Institution.insertMany([
            { Name: "IIT Mumbai", Code: "IITM" },
            { Name: "IIT Kharagpur", Code: "IITKh" },
            { Name: "IIT Kanpur", Code: "IITK" },
            { Name: "IIT Chennai", Code: "IITC" },
            { Name: "NIT Kozhikkode", Code: "NITC" },
            { Name: "NIT Surathkal", Code: "NITS" },
            { Name: "College of Engineering, Thrissur", Code: "CETSR" },
            { Name: "CBSE", Code: "CBSE" },
            { Name: "Kerala State Board", Code: "KSB" }
        ]);
        console.log("Inserting institutions details");


        //Insert specializations
        const specializations = await Specialization.insertMany([
            { Specialization: "Computer Science" },
            { Specialization: "Mechanical Engineering" },
            { Specialization: "Computer Engineering" },
            { Specialization: "Electrical Engineering" },
            { Specialization: "Mathematics, Physics, Chemistry" }
        ]);
        console.log("Inserting specializations details");

        console.log("Seeding completed successfully");
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
};

seedData();