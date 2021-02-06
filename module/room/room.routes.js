import express from "express";
import roomController from "./room.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const roomRoutes = express.Router();

roomRoutes.post("/", asyncWrapper(roomController.create));
roomRoutes.delete("/:id", asyncWrapper(roomController.delete));

export { roomRoutes };
