const express = require("express");
const router = express.Router();
const { ProductModel, validProduct } = require("../models/productModel");

// ולידציה?
// לבדוק אם הקטגוריה עובד בהוספת מוצר 
// להוסיף פונקציית גארד

// משיכה של כל המוצרים
router.get("/", async (req, res) => {
    res.send(await ProductModel.find());
});

// משיכה של מוצר אחד
router.get("/:id", async (req, res) => {
    res.send(await ProductModel.find({ _id: req.params.id }));
});

// משיכה של קטגוריה אחת
router.get("/category/:cat", async (req, res) => {
    res.send(await ProductModel.find({ category: req.params.cat }));
});

// הוספה של מוצר למועדפים
router.put("/:productId/favorite", async (req, res) => {
    const { id } = req.body;
    const ProductFind = await ProductModel.findOne({ _id: req.params.productId });

    if (!ProductFind) {
        return res.status(403).send("Product does not exist");
    }

    // לבדוק אם עובד
    // let validBody = validGrade(req.body);
    // if (validBody.error) {
    //     return res.status(400).json(validBody.error.details);
    // }

    ProductFind.likes = [...ProductFind.likes, id];
    // ProductFind.likes.push(id);

    await ProductFind.save();
    res.send();
});


router.put("/:productId/unfavorite", async (req, res) => {
    const { id } = req.body;
    const ProductFind = await ProductModel.findOne({ _id: req.params.productId });

    if (!ProductFind) {
        return res.status(403).send("Product does not exist");
    }

    const UserIndex = ProductFind.likes.findIndex(x => x == id);

    if (!UserIndex || UserIndex == "-1") {
        return res.status(403).send("User does not exist");
    }

    ProductFind.likes.splice(UserIndex, 1);

    await ProductFind.save();
    res.send();
});





// הוספה של מוצר אחד - לבדוק
// router.post("/new-product", async (req, res) => {
//     let validBody = validProduct(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }

//     const { productName, description, price, sizes, color, img, category } = req.body;

//     const product = new ProductModel({
//         productName,
//         description,
//         price,
//         sizes,
//         color,
//         img,
//         category,
//     });

//     const newProduct = await product.save();
//     res.send(newProduct);
// });

// // // לעדכן מוצר - לבדוק
// router.put("/:id", async (req, res) => {
//     const { productName, description, price, sizes, color, img, category } = req.body;
//     const productFind = await ProductModel.findOne({ _id: req.params.id });

//     if (!productFind) {
//         return res.status(403).send("Product does not exist");
//     }

//     // לבדוק אם עובד
//     let validBody = validGrade(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }

//     productFind.productName = productName;
//     productFind.description = description;
//     productFind.price = price;
//     productFind.sizes = sizes;
//     productFind.color = color;
//     productFind.img = img;
//     productFind.category = category;

//     await productFind.save();
//     res.send(productFind);
// });

// מחיקת מוצר 
// router.delete("/:id", async (req, res) => {
//     await ProductModel.deleteOne({ _id: req.params.id });
//     res.send();
// });

module.exports = router;