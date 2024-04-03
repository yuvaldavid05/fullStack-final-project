const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
    res.send(await UserModel.find());
});

router.get("/:id", async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});

// router.post("/", async (req, res) => {
//     // לבדוק אם הולידציה חיונית,מתאימה
//     let validBody = validUser(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }

//     // const { firstName, lastName, email, phone, password } = req.body;
//     // const user = new UserModel({ firstName, lastName, email, phone, password : await bcrypt.hash(password,10) });
//     const user = new UserModel(req.body);
//     const newUser = await user.save();
//     res.send(newUser);
// });


// Authorization

// Login status
router.get("/", async (req, res) => {

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

    res.send(user);
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
    });

    const newUser = await user.save();
    delete newUser.password;
    res.send(newUser);
});

// Logout
router.get("/signup", async (req, res) => {

});

module.exports = router;