import express from "express";
import { todoRoutes } from "../../module/todo/todo.routes";

const apiRoutes = express.Router();

apiRoutes.use("/todos", todoRoutes);

export default apiRoutes;
