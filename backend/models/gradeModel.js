const mongoose = require("mongoose");
const Joi = require("joi");

const gradeSchema = new mongoose.Schema({
    date: String,
    grade: String,
    title: String
});

const GradeModel = mongoose.model("grades", gradeSchema);
exports.GradeModel = GradeModel;

exports.validGrade = (_bodyData) => {
    let joiSchema = Joi.object({
        date: Joi.string().required(),
        grade: Joi.string().min(1).max(100).required(),
        title: Joi.string().min(1).max(20).required(),
    })

    return joiSchema.validate(_bodyData);

}