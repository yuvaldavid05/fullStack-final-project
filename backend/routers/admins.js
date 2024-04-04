const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const { ProductModel } = require("../models/productModel");

//  משיכה של כל היוזרים -עובד
router.get("/users", async (req, res) => {
    res.send(await UserModel.find());
});

// משיכה של יוזר ספציפי - עובד
router.get("/users/:id", async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});


// עריכה של יוזר אחד
router.put("/users/:id", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { firstName, lastName, email, phone } = req.body;
    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!user) {
        return res.status(403).send("User does not exist");
    }

    userFind.firstName = firstName;
    userFind.lastName = lastName;
    userFind.email = email;
    userFind.phone = phone;

    await userFind.save();
    res.send(userFind);
});

// מחיקה של יוזר ע"י אדמין - עובד
router.delete("/users/:userId", async (req, res) => {
    await UserModel.deleteOne({ _id: req.params.userId });
    res.send();
});

// מחיקה של מוצר ע"י האדמין - עובד
router.delete("/products/:productId", async (req, res) => {
    await ProductModel.deleteOne({ _id: req.params.productId });
    res.send();
});

module.exports = router;