const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

/*
 * CREATE Employee
 * POST /employee
 */
router.post("/",auth, async (req, res) => {
    try {
        // console.log("BODY:", req.body);
        const employee = await Employee.create(req.body);

        res.status(201).json({
            success: true,
            data: employee
        });
    } catch (err) {

        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            const messages = {
                PersonalEmail: "PersonalEmail already exists",
                FirstName: "FirstName already exists"
            };

            return res.status(400).json({
                success: false,
                error: messages[field] || `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * GET All Employee
 * GET /employee
 */
router.get("/", auth, async (req, res) => {
    try {
        const employees = await Employee.find();

        res.json({
            success: true,
            count: employees.length,
            data: employees
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * GET Employee By ID
 * GET /employee/:id
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.json({
            success: true,
            data: employee
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


/*
 * GET All Employee by /{pageSize}/{pageNum}/{sortField}/{sortOrder}
 * GET /employee
 */
router.get("/:pageSize/:pageNum/:sortField/:sortOrder", auth, async (req, res) => {
    try {

        const pageSize = parseInt(req.params.pageSize);
        const pageNum = parseInt(req.params.pageNum);
        const sortField = req.params.sortField;
        const sortOrder = req.params.sortOrder;

        const sort = {};
        sort[sortField] = sortOrder === "desc" ? -1 : 1;

        const count = await Employee.countDocuments();

        const employees = await Employee.find()
                .sort(sort)
                .skip((pageNum - 1) * pageSize)
                .limit(pageSize);

        res.json({
            success: true,
            count,
            pageNum,
            pageSize,
            totalPages: Math.ceil(count / pageSize),
            data: employees
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


/*
 * UPDATE Employee keys (Used to update specific fields of an existing resource.)
 * patch /employee/:id
 */
router.patch("/:id", auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: "Employee not found"
            });
        }
        
        res.json({
            success: true,
            data: employee
        });
    } catch (err) {

        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            const messages = {
                PersonalEmail: "PersonalEmail already exists",
                FirstName: "FirstName already exists"
            };

            return res.status(400).json({
                success: false,
                error: messages[field] || `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/*
 * UPDATE Employee whole data (Used to update an existing resource completely.)
 * PUT /employee/:id
 */
router.put("/:id", auth, async (req, res) => {
    try {
        const employee = await Employee.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                error: "Employee not found"
            });
        }
        
        res.json({
            success: true,
            data: employee
        });
    } catch (err) {

        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            const messages = {
                PersonalEmail: "PersonalEmail already exists",
                FirstName: "FirstName already exists"
            };

            return res.status(400).json({
                success: false,
                error: messages[field] || `${field} already exists`
            });
        }

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});



/*
 * DELETE Employee
 * DELETE /employee/:id
 */
router.delete("/:id", auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Employee deleted",
            data: employee
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;