const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
});

const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(30).required(),
        email: Joi.string().required().email({ tlds: false }),
        phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `טלפון חייב להיות לפחות 10 ספרות` }).required(),
        password: Joi.string().min(8).max(32).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "string.pattern.base": "הסיסמה חייבת לכלול לפחות אות אחת גדולה ואות אחת קטנה באנגלית, לפחות ארבעה מספרים וסימן מיוחד מבין הסימנים הבאים (!@%$#^&*-_*)",
        }),
        role: Joi.array().items(Joi.string()).required()
        // regex
    })

    return joiSchema.validate(_bodyData);

}