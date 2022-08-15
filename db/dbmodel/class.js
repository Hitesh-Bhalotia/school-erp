const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  section: {
    type: String,
    trim: true,
  },
});

const Class = mongoose.model("Class", ClassSchema);

module.exports = Class;
