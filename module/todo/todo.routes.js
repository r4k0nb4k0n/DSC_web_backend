import express from "express";
import todoController from "./todo.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const todoRoutes = express.Router();

todoRoutes.post("/", asyncWrapper(todoController.create));
todoRoutes.get("/", asyncWrapper(todoController.findAll));
todoRoutes.get("/:id", asyncWrapper(todoController.findOne));
todoRoutes.patch("/:id", asyncWrapper(todoController.update));
todoRoutes.delete("/:id", asyncWrapper(todoController.delete));

export { todoRoutes };
