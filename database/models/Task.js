const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task should have a name"],
    trim: true,
    maxlength: [20, "name cannot have more than 20 characters"],
  },
  description: String,
  completed: { type: Boolean, default: false },
});

//schema define the types and the validation
//model will use the schema and create model and provide interface to wrok with database

module.exports = mongoose.model("Task", TaskSchema);
