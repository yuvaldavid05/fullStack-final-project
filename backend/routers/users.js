const express = require("express");
const router = express.Router();
const { UserModel, validUser } = require("../models/userModel");


//  משיכה של כל היוזרים -עובד
router.get("/", async (req, res) => {
    res.send(await UserModel.find());
});

// משיכה של יוזר ספציפי - עובד
router.get("/:id", async (req, res) => {
    res.send(await UserModel.findOne({ _id: req.params.id }));
});


// router.post("/", async (req, res) => {
//     // לבדוק אם הולידציה חיונית,מתאימה
//     let validBody = validGrade(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }
//     const user = new GradeModel(req.body);
//     const newUswe = await user.save();
//     res.send(newUswe);
// });

// router.put("/:id", async (req, res) => {
//     const { date, grade, title } = req.body;
//     const gradeFind = await GradeModel.findOne({ _id: req.params.id });

//     if (!gradeFind) {
//         return res.status(403).send("משתמש לא קיים");
//     }

//     // לבדוק אם עובד
//     let validBody = validGrade(req.body);
//     if (validBody.error) {
//         return res.status(400).json(validBody.error.details);
//     }

//     gradeFind.date = date;
//     gradeFind.grade = grade;
//     gradeFind.title = title;

//     await gradeFind.save();
//     res.send(gradeFind);
// });