const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  desiredSkills: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
});

const Jobs = mongoose.model("Job", formSchema);

module.exports = Jobs;
