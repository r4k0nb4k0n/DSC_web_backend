import { userModel } from "./user.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
// import { body, validationResult } from "validator";

const userController = {};

// email로 회원가입
userController.email_create = async (req, res) => {
  try {
    console.log(req.body);
		// req.body.tmp = 1;
		// res.body.tmp = 1;
		// var user = { id: 1 }; 
		// body('email').isEmail();
		// const errors = validationResult(req);
		
    const user = await userModel.create({
      email: req.body.email,
			// password: req.body.password
    });
    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

userController.findAll = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

userController.email_find = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user not found" });
    }
    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

userController.update = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user not found" });
    }
    Object.assign(user, req.body);
    await user.save();
    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

userController.delete = async (req, res) => {
  try {
    const user = await userModel.findByIdAndRemove(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "user not found" });
    }
    return res.json({ message: "user deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export default userController;