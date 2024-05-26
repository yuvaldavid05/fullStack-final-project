const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
    admin: Boolean,
    orders: Array,
});

const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(30).required(),
        email: Joi.string().required().email({ tlds: false }),
        phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `"phone" must be at least 10 digits` }).required(),
        password: Joi.string().min(8).max(32).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "string.pattern.base": "The password must include at least one uppercase letter and one lowercase letter, at least four numbers and a special character from the following characters (!@%$#^&*-_*)",
        }),
        country: Joi.string().min(1).required(),
        city: Joi.string().min(1).required(),
        street: Joi.string().min(1).required(),
        houseNumber: Joi.number().min(1).required(),
        zip: Joi.number().min(1).required(),
        admin: Joi.boolean().default(false),
        orders: Joi.array().items(Joi.string()),

    })

    return joiSchema.validate(_bodyData);

}