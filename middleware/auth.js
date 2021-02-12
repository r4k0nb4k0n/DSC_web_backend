import { userModel } from "../user.model";
import cookieParser from "cookie-parser";


let auth = (req, res, next) => {
	let token = req.cookies.x_auth;

	userModel.findByToken(token)
	.then((user) => {
		if (!user)
			return res.send('해당 유저가 존재하지 않습니다.');
		req.token = token;
		req.user = user;
		next();
	})
	.catch((err) => {
		throw err;
	});
};

export { auth };