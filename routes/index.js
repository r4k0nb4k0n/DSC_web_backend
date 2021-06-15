import express from "express";
import apiRoutes from "./api";
import userRouters from "../module/user/user.routes";

const mainRouter = express.Router();

mainRouter.all("/", (req, res, next) => {
  res.redirect("/api-docs");
});
mainRouter.use("/api", apiRoutes);

export default mainRouter;
