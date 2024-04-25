const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "FinalProject2024MyToken";
const moment = require("moment");


// לחבר את הגראד לכל הפונקציות - בדיקה אם הוא מורשה
// לייבא את מומנט לבדוק אם עובד - זמן שבוא היוזר נוצר
// לסיים את השיעורים של אלישיב


// Authorization

// Login status
router.get("/", async (req, res) => {

});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).send("username or password is incorrect");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).send("username or password is incorrect");
    }

    const userResult = user.toObject();
    delete userResult.password;
    userResult.token = jwt.sign({ user: userResult }, JWT_SECRET, { expiresIn: '1h' });

    res.send(userResult);
});

// SignUp
router.post("/signup", async (req, res) => {
    // ולידציה - לבדוק אם עובד
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { firstName, lastName, email, phone, password } = req.body;

    const user = new UserModel({
        firstName,
        lastName,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        // createdTime: moment().format('DD/MM/YYYY HH:mm:ss')
        // לא עובד הזמן
    });

    const newUser = await user.save();
    delete newUser.password;
    res.send(newUser);
});

// Logout - אלישיב סיים דרך הצד לקוח
router.get("/signup", async (req, res) => {

});

module.exports = router;