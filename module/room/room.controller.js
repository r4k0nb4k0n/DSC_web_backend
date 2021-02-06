import { roomModel } from "./room.model";
import { StatusCodes } from "http-status-codes";

const roomController = {};

roomController.create = async (req, res) => {
  try {
    const pin = (Math.floor(Math.random() * 1000000) + 1000000)
      .toString()
      .substring(1);
    const dup = await roomModel.findOne({ pin: pin });
    if (dup) throw new Error("Failed to generate PIN Code");
    const room = await roomModel.create({
      pin: pin,
      gameId: req.body.gameId,
      gamers: [],
    });
    return res.json(room);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

roomController.delete = async (req, res) => {
  try {
    const room = await roomModel.findByIdAndRemove(req.params.id);
    if (!room) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "room not found" });
    }
    return res.json({ message: "room deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default roomController;
