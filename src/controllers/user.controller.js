const express = require("express");
const { body, validationResult } = require('express-validator');
const { is } = require("express/lib/request");
const router = express.Router();
const User = require("../models/user.model");

router.post("/",
    body("firstName").not().isEmpty().withMessage("FirstName is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("pincode").not().isEmpty().isNumeric().custom((value) => {

        console.log('pincode:', value);
        // console.log('pincode:', value.toString().length);
        if ((value.toString().length)!==6) { //x.toString().length
            throw new Error("Pincode should have 6 digit");
        }
        return true;
    }),
    body("age").not().isEmpty().isNumeric().withMessage("Age must be numberic").custom((value) => {
        // console.log('value:', value)
        if (value < 1 || value > 100) {
            throw new Error("Invalid Age");
        }
        return true;
    }),
    body("gender").not().isEmpty()
    .custom((value) => {
        console.log('value:', value)
        if (value!="Male" || value!="Female" || value!="Others") {
            throw new Error("Gender is not correct");
        }
        return true;
    }),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const user = await User.create(req.body);
            return res.status(201).send(user)
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    });
module.exports = router;