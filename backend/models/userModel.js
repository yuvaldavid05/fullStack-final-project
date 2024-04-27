const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    admin: Boolean,
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
        admin: Joi.boolean().default(false),
        // role: Joi.array().items(Joi.string()).default("user"),
        // createdTime: Joi.date().greater('now').iso(),
        // regex
    })

    return joiSchema.validate(_bodyData);

}