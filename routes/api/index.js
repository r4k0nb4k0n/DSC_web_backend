import express from "express";
import { todoRoutes } from "../../module/todo/todo.routes";
import { roomRoutes } from "../../module/room/room.routes";

const apiRoutes = express.Router();

apiRoutes.use("/todos", todoRoutes);
apiRoutes.use("/room", roomRoutes);

export default apiRoutes;
