const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, getUser } = require("../config");
const authGuard = require('../auth-guard');


// Authorization

// Login status
router.get("/login", authGuard, async (req, res) => {
    const user = getUser(req);

    res.send(user);
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(403).send("username or password is incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(403).send("username or password is incorrect");
    }

    const userResult = user.toObject();
    delete userResult.password;
    delete userResult.orders;
    userResult.token = jwt.sign({ user: userResult }, JWT_SECRET, { expiresIn: '4h' });

    res.send(userResult);
});


// SignUp
router.post("/signup", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { firstName, lastName, email, phone, password, country, city, street, houseNumber, zip } = req.body;


    const user = new UserModel({
        firstName,
        lastName,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        country,
        city,
        street,
        houseNumber,
        zip,
        admin: false,
        orders: []
    });

    const newUser = await user.save();
    delete newUser.password;
    res.send(newUser);
});

module.exports = router;