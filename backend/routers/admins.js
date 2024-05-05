const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");
const { ProductModel, validProduct } = require("../models/productModel");


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
// router.put("/users/update/:id", async (req, res) => {
//     let validBody = validUser(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }

//     const { firstName, lastName, email, phone } = req.body;
//     const userFind = await UserModel.findOne({ _id: req.params.id });

//     if (!userFind) {
//         return res.status(403).send("User does not exist");
//     }

//     userFind.firstName = firstName;
//     userFind.lastName = lastName;
//     userFind.email = email;
//     userFind.phone = phone;

//     await userFind.save();
//     res.send(userFind);
// });

// שינוי הרשאות ADMIN - עובד
router.put("/users/update-admin/:id", async (req, res) => {

    const userFind = await UserModel.findOne({ _id: req.params.id });

    if (!userFind) {
        return res.status(403).send("User does not exist");
    }

    userFind.admin = !userFind.admin;

    await userFind.save();
    res.send();

});

// מחיקה של יוזר ע"י אדמין - עובד
router.delete("/users/delete/:userId", async (req, res) => {
    await UserModel.deleteOne({ _id: req.params.userId });
    res.send();
});

// משיכה של כל המוצרים
router.get("/products", async (req, res) => {
    res.send(await ProductModel.find({}));
});

// משיכה של כל המוצרים
router.get("/products/:id", async (req, res) => {
    res.send(await ProductModel.findOne({ _id: req.params.id }));
});

// הוספה של מוצר אחד - לבדוק
router.post("/products/new-product", async (req, res) => {
    let validBody = validProduct(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }

    const { productName, description, price, sizes, color, img, category, stock } = req.body;


    // לבדוק את המערך LIKES איך הוא חוזר
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
    });

    const newProduct = await product.save();
    res.send(newProduct);
});

// // לעדכן מוצר - עובד
router.put("/products/update/:id", async (req, res) => {
    const { productName, description, price, sizes, color, img, category, stock } = req.body;


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

    await productFind.save();
    // const updateProduct = await productFind.save();
    res.send();
});

// מחיקה של מוצר ע"י האדמין - עובד
router.delete("/products/:productId", async (req, res) => {
    await ProductModel.deleteOne({ _id: req.params.productId });
    res.send();
});

module.exports = router;