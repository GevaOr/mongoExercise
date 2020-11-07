const mongoose = require("mongoose");

const TutorialsSchema = mongoose.Schema({
  title: String,
  parts: Array,
  published: Boolean,
});

const Tutorials = mongoose.model("Tutorials", TutorialsSchema);
module.exports = Tutorials;
