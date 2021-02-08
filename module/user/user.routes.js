import express from "express";
import userController from "./user.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";

const userRoutes = express.Router();
// get은 DB에서 클라이언트 정보 가져오기
// post는 클라이언트가 DB로 정보 보내기
userRoutes.post('/signup', asyncWrapper(userController.userCreate));	// email, password로 가입
userRoutes.get('/signin', asyncWrapper(userController.userFind));			// 모든 유저 정보 불러오기
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