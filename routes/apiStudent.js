const express = require("express");
const student = require("../model/studet");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/new", async (req, res) => {
  const s = new student(req.body);
  const saveRes = await s.save();
  console.log(saveRes);
  res.send(req.body);
});
router.put("/update/", validateIsStudent, async (req, res) => {
  req.student = await student.findById(req.body.id);
  if (!req.student) {
    res.send("student doesnt exist " + req.student);
    return;
  }
  req.student.name = req.body.name;
  req.student.last = req.body.last;
  req.student.age = req.body.age;
  req.student.gender = req.body.gender;
  req.student.phone = req.body.phone;
  const result = await req.student.save();
  res.send(result);
});
router.delete("/delete/:id", validateId, async (req, res) => {
  console.log(req.params);
  req.student = await student.findByIdAndDelete(req.params.id);
  if (!req.student) {
    res.send("student doesnt exist " + req.student);
    return;
  }
  const result = {
    msg: "success",
    statusResult: res.statusCode,
    result: req.student,
  };
  res.send(result);
});
function validateIsStudent(req, res, next) {
  if (!req.body.name) {
    res.send("no student to edit");
  } else if (!req.body.id) {
    res.send("student id is require");
  } else if (
    !req.body.id.match(/^[0-9a-fA-F]{24}$/) ||
    !mongoose.Types.ObjectId.isValid(req.body.id)
  ) {
    res.send("student id it's not a valid ObjectId");
  } else {
    next();
  }
}
function validateId(req, res, next) {
  if (!req.params.id) {
    res.send("student id is require");
  } else if (
    !req.params.id.match(/^[0-9a-fA-F]{24}$/) ||
    !mongoose.Types.ObjectId.isValid(req.params.id)
  ) {
    res.send("student id it's not a valid ObjectId");
  } else {
    next();
  }
}
module.exports = router;
