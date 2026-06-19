const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const Country = require("../models/Country");
const Course = require("../models/Course");
const Designation = require("../models/Designation");
const Institution = require("../models/Institution");
const Specialization = require("../models/Specialization");


/*
 * GET All Company
 * GET /Company
 */
router.get("/companies", async (req, res) => {
    try {
        const companies = await Company.find();

        res.json({
            success: true,
            count: companies.length,
            data: companies
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * GET All countries
 * GET /countries
 */
router.get("/countries", async (req, res) => {
    try {
        const countries = await Country.find();

        res.json({
            success: true,
            count: countries.length,
            data: countries
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * GET All courses
 * GET /courses
 */
router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();

        res.json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * GET All designations
 * GET /designations
 */
router.get("/designations", async (req, res) => {
    try {
        const designations = await Designation.find();

        res.json({
            success: true,
            count: designations.length,
            data: designations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


/*
 * GET All Educational institutions
 * GET /institutions
 */
router.get("/institutions", async (req, res) => {
    try {
        const institutions = await Institution.find();

        res.json({
            success: true,
            count: institutions.length,
            data: institutions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});



/*
 * GET All specializations
 * GET /specializations
 */
router.get("/specializations", async (req, res) => {
    try {
        const specializations = await Specialization.find();

        res.json({
            success: true,
            count: specializations.length,
            data: specializations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.get("/test", (req, res) => {
  res.json({ message: "working" });
});

module.exports = router;
