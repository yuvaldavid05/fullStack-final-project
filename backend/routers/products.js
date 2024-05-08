const express = require("express");
const router = express.Router();
const { ProductModel, validProduct } = require("../models/productModel");
const { UserModel, validUser } = require("../models/userModel");

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

// router.get("/all-favorite/:idUser", async (req, res) => {
//     const UserFind = await UserModel.findOne({ _id: req.params.idUser });


//     if (!UserFind) {
//         return res.status(403).send("User does not exist");
//     }

//     let arrayUserLikes = [];

//     await ProductModel.map(x => x.like.find(y => y == idUser ? arrayUserLikes.push(x._id) : ""));

//     read.send(arrayUserLikes);

// });

// הוספה של מוצר למועדפים
router.put("/:productId/favorite", async (req, res) => {
    const { id } = req.body;
    const ProductFind = await ProductModel.findOne({ _id: req.params.productId });

    if (!ProductFind) {
        return res.status(403).send("Product does not exist");
    }

    ProductFind.likes = [...ProductFind.likes, id];

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

    if (UserIndex == "-1") {
        return res.status(403).send("User does not exist ");
    }

    ProductFind.likes.splice(UserIndex, 1);

    await ProductFind.save();
    res.send({ UserIndex });
});

// לסיים - פונציה שמורידה את המלאי של הפריטים שנקנו
router.put("/update-stock/:productId", async (req, res) => {

    const productFind = await ProductModel.findOne({ _id: req.params.productId });

    if (!productFind) {
        return res.status(403).send("Product does not exist");
    }

    productFind.stock = productFind.stock - 1;

    await productFind.save();
    res.send();

});




module.exports = router;