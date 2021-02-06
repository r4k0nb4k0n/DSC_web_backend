import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  pin: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  gamers: {
    type: Array,
    required: true,
    default: [],
  },
});

const roomModel = mongoose.model("room", roomSchema);
export { roomModel };
