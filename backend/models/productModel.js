const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: Number,
    sizes: Array,
    color: Array,
    img: String,
    category: String,
    stock: Number,
    likes: Array,
});

const ProductModel = mongoose.model("products", productSchema);
exports.ProductModel = ProductModel;

exports.validProduct = (_bodyData) => {
    let joiSchema = Joi.object({
        productName: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(30).required(),
        price: Joi.number().min(1).max(600).required(),
        sizes: Joi.array().items(Joi.string()).required(),
        color: Joi.array().items(Joi.string()).required(),
        img: Joi.string().min(1).max(150).required(),
        category: Joi.string().min(1),
        stock: Joi.number().min(0).max(600).required(),
        likes: Joi.array().items(Joi.string()).required(),
    })

    return joiSchema.validate(_bodyData);

}
