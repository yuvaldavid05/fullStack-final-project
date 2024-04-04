const express = require("express");
const router = express.Router();
const { ProductModel } = require("../models/productModel");

// ולידציה?

// משיכה של כל המוצרים
router.get("/", async (req, res) => {
    res.send(await ProductModel.find());
});

// משיכה של מוצר אחד
router.get("/:id", async (req, res) => {
    res.send(await ProductModel.find({ _id: req.params.id }));
});

module.exports = router;