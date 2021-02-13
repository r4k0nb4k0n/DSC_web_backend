import express from "express";
import userController from "./user.controller";
import { asyncWrapper } from "../../utils/asyncWrapper";
// alias로 경로 간결하게 만들 수 있음
const userRoutes = express.Router();

// get은 DB에서 클라이언트 정보 가져오기
// post는 클라이언트가 DB로 정보 보내기
userRoutes.post('/signup', asyncWrapper(userController.userCreate));	// email, password로 가입
userRoutes.post('/signin', asyncWrapper(userController.login));				// email, password 일치 시 로그인하기
userRoutes.get('/auth', asyncWrapper(userController.auth));	

export { userRoutes };