import express from "express";
import { todoRoutes } from "../../module/todo/todo.routes";
import { userRoutes } from "../../module/user/user.routes";

const apiRoutes = express.Router();

apiRoutes.use("/todos", todoRoutes);
apiRoutes.use("/user", userRoutes);

export default apiRoutes;
