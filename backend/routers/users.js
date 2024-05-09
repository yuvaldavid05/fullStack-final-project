const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");


//  משיכה של כל היוזרים 
router.get("/", async (req, res) => {
    res.send(await UserModel.find());
});

// משיכה של יוזר ספציפי
router.get("/:id", async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});

router.put("/update-order/:id", async (req, res) => {
    const { payment, delivery, basket } = req.body;
    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!userFind) {
        return res.status(403).send("User does not exist");
    }
    const order = {
        payment: payment,
        delivery: delivery,
        basket: basket
    }
    userFind.orders.push(order);
    await userFind.save();
    res.send();

});


module.exports = router;