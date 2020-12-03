const mongoose = require("mongoose");
const slugify = require("slugify");
const dompurify = require("dompurify");

const studentSechema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
  },
  phone: {
    type: String,
  },
  topics: [String],
});

studentSechema.pre("validate", (next) => {
  console.log(this);
  if (this.name) {
    this.name = dompurify.sanitize(this.name);
    console.log(name);
  }
  next();
});

module.exports = mongoose.model("student", studentSechema);
