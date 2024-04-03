const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: Number,
    sizes: Array,
    color: Array,
    img: String
});

const ProductModel = mongoose.model("products", productSchema);
exports.ProductModel = ProductModel;

exports.validProduct = (_bodyData) => {
    let joiSchema = Joi.object({
        productName: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(30).required(),
        price: Joi.string().min(1).max(600).required(),
        sizes: Joi.array().items(Joi.string()).required(),
        color: Joi.array().items(Joi.string()).required(),
        img: Joi.string().min(1).max(150).required(),
    })

    return joiSchema.validate(_bodyData);

}
