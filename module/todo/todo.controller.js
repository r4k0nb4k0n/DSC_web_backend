import { todoModel } from "./todo.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const todoController = {};

todoController.create = async (req, res) => {
  try {
    console.log(req.body);
    const todo = await todoModel.create({
      content: req.body.content,
    });
    return res.json(todo);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

todoController.findAll = async (req, res) => {
  try {
    const todos = await todoModel.find();
    return res.json(todos);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

todoController.findOne = async (req, res) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (!todo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

todoController.update = async (req, res) => {
  try {
    let todo = await todoModel.findById(req.params.id);
    if (!todo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Todo not found" });
    }
    Object.assign(todo, req.body);
    await todo.save();
    return res.json(todo);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

todoController.delete = async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndRemove(req.params.id);
    if (!todo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Todo not found" });
    }
    return res.json({ message: "TOdo deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default todoController;
