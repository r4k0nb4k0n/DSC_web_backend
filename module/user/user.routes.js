import express from "express";
import userController from "./user.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const userRoutes = express.Router();
// get은 사용자 정보 가져오기
userRoutes.post('/signup', asyncWrapper(userController.email_create));
userRoutes.get('/signup', asyncWrapper(userController.email_find));
// userRouters.post('/signup', asyncWrapper(userController.signup));
// userRouters.post('/signin', asyncWrapper(userController.signin));
// userRouters.post('/logout', asyncWrapper(userController.logout));


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