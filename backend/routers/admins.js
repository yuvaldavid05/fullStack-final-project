const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const { ProductModel } = require("../models/productModel");


// להוסיף את authGuard

//  משיכה של כל היוזרים -עובד
router.get("/users", async (req, res) => {
    res.send(await UserModel.find());
});

// משיכה של יוזר ספציפי - עובד
router.get("/users/:id", async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});


// עריכה של יוזר אחד
router.put("/users/update/:id", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { firstName, lastName, email, phone } = req.body;
    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!userFind) {
        return res.status(403).send("User does not exist");
    }

    userFind.firstName = firstName;
    userFind.lastName = lastName;
    userFind.email = email;
    userFind.phone = phone;

    await userFind.save();
    res.send(userFind);
});

// שינוי הרשאות ADMIN - עובד
router.put("/users/update-admin/:id", async (req, res) => {

    // const { admin } = req.body;
    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!userFind) {
        return res.status(403).send("User does not exist");
    }

    userFind.admin = !userFind.admin;

    await userFind.save();
    // res.send(userFind);
    res.send();

});

// מחיקה של יוזר ע"י אדמין - עובד
router.delete("/users/delete/:userId", async (req, res) => {
    await UserModel.deleteOne({ _id: req.params.userId });
    res.send();
});


// הוספה של מוצר אחד - לבדוק
router.post("/products/new-product", async (req, res) => {
    let validBody = validProduct(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { productName, description, price, sizes, color, img, category } = req.body;

    const product = new ProductModel({
        productName,
        description,
        price,
        sizes,
        color,
        img,
        category,
    });

    const newProduct = await product.save();
    res.send(newProduct);
});

// // לעדכן מוצר - לבדוק
router.put("/products/update/:id", async (req, res) => {
    const { productName, description, price, sizes, color, img, category } = req.body;
    const productFind = await ProductModel.findOne({ _id: req.params.id });

    if (!productFind) {
        return res.status(403).send("Product does not exist");
    }

    // לבדוק אם עובד
    let validBody = validGrade(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    productFind.productName = productName;
    productFind.description = description;
    productFind.price = price;
    productFind.sizes = sizes;
    productFind.color = color;
    productFind.img = img;
    productFind.category = category;

    await productFind.save();
    res.send(productFind);
});

// מחיקה של מוצר ע"י האדמין - עובד
router.delete("/products/:productId", async (req, res) => {
    await ProductModel.deleteOne({ _id: req.params.productId });
    res.send();
});

module.exports = router;