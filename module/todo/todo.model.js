import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const todoModel = mongoose.model("todo", todoSchema);
export { todoModel };
