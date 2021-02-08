import express from "express";
import userController from "./user.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const userRouters = express.Router();

userRouters.get('/:singup', asyncWrapper(userController.signup));
userRouters.post('/:singup', asyncWrapper(userController.signup));
userRouters.post('/:signin', asyncWrapper(userController.signin));
userRouters.post('/:logout', asyncWrapper(userController.logout));


// GET /signup으로 좁속했을 때의 라우터
/*
router.get('/singup',async(req, res, next) => {
	try {
		// User.find({})로 모든 사용자 찾기
		const users = await User.find({});
		res.render('mongoose', 'users');
	} catch (err) {
		console.error(err);
		next(err);
	}
});
*/

export { userRoutes };