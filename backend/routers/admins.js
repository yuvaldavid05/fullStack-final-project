const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const { ProductModel, validProduct } = require("../models/productModel");
const authGuard = require('../auth-guard');



//  משיכה של כל היוזרים
router.get("/users", authGuard, async (req, res) => {
    res.send(await UserModel.find());
});

// משיכה של יוזר ספציפי
router.get("/users/:id", authGuard, async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});

// שינוי הרשאות ADMIN 
router.put("/users/update-admin/:id", authGuard, async (req, res) => {

    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!userFind) {
        return res.status(403).send("User does not exist");
    }

    userFind.admin = !userFind.admin;

    await userFind.save();
    res.send();

});

// מחיקה של יוזר ע"י אדמין
router.delete("/users/delete/:userId", authGuard, async (req, res) => {
    await UserModel.deleteOne({ _id: req.params.userId });
    res.send();
});

// משיכה של כל המוצרים
router.get("/products", authGuard, async (req, res) => {
    res.send(await ProductModel.find({}));
});

// משיכה של מוצר ספציפי
router.get("/products/:id", authGuard, async (req, res) => {
    res.send(await ProductModel.findOne({ _id: req.params.id }));
});

// הוספה של מוצר אחד
router.post("/products/new-product", authGuard, async (req, res) => {
    let validBody = validProduct(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { productName, description, price, sizes, color, img, category, stock, gender, fabricType, collectionP } = req.body;


    const product = new ProductModel({
        productName,
        description,
        price,
        sizes,
        color,
        img,
        category,
        stock,
        likes: [],
        gender,
        fabricType,
        collectionP
    });

    const newProduct = await product.save();
    res.send(newProduct);
});

// // לעדכן מוצר 
router.put("/products/update/:id", authGuard, async (req, res) => {
    const { productName, description, price, sizes, color, img, category, stock, gender, fabricType, collectionP } = req.body;


    const productFind = await ProductModel.findOne({ _id: req.params.id });

    if (!productFind) {
        return res.status(403).send("Product does not exist");
    }


    productFind.productName = productName;
    productFind.description = description;
    productFind.price = price;
    productFind.sizes = sizes;
    productFind.color = color;
    productFind.img = img;
    productFind.category = category;
    productFind.stock = stock;
    productFind.gender = gender;
    productFind.fabricType = fabricType;
    productFind.collectionP = collectionP;

    await productFind.save();
    // const updateProduct = await productFind.save();
    res.send();
});

// מחיקה של מוצר ע"י האדמין 
router.delete("/products/:productId", authGuard, async (req, res) => {
    await ProductModel.deleteOne({ _id: req.params.productId });
    res.send();
});

module.exports = router;