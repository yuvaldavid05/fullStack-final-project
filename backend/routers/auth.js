const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, getUser } = require("../config");
const authGuard = require('../auth-guard');
// const moment = require("moment");


// לחבר את הגראד לכל הפונקציות - בדיקה אם הוא מורשה
// לייבא את מומנט לבדוק אם עובד - זמן שבוא היוזר נוצר
// לסיים את השיעורים של אלישיב


// Authorization
// jwt.verify(req.headers.authorization, JWT_SECRET, (err, decode) => {
//     if (err) {
//         res.status(401).send("User is not authorized")
//     } else {
//         res.send(decode.user);
//     }
// })
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
    userResult.token = jwt.sign({ user: userResult }, JWT_SECRET, { expiresIn: '1h' });

    res.send(userResult);
});


// SignUp
router.post("/signup", async (req, res) => {
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
        admin: false,
        // createdTime: moment().format('DD/MM/YYYY HH:mm:ss')
        // לא עובד הזמן
    });

    const newUser = await user.save();
    delete newUser.password;
    res.send(newUser);
});

// Logout - אלישיב סיים דרך הצד לקוח
router.get("/logout", async (req, res) => {

});

module.exports = router;