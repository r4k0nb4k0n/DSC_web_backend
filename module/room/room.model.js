import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gamerSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  answerTime: {
    type: Date,
    required: true,
  },
});

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
    type: [gamerSchema],
    required: true,
    default: [],
  },
});

const roomModel = mongoose.model("room", roomSchema);
export { roomModel };
