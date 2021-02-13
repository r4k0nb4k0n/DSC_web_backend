import { userModel } from "./user.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { auth } from "../middleware/auth";


const userController = {};


// email, password 회원가입
userController.userCreate = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.create({
      email: req.body.email,
			password: req.body.password
    });
    return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send('중복된 이메일입니다.');
  }
};

// 로그인시 DB에 저장된 email 먼저 찾고, email 있다면 암호화된 password랑 user가 입력한 password 비교
userController.login = async (req, res) => {
  try {
		const user = await userModel.findOne({
      // email 먼저 비교
			email: req.body.email
		});
    // const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
				.send('가입 되지 않은 회원입니다.');
				// .redirect("/api-docs");														// 로그인 화면으로 다시 redirect
    }
		user
		.comparePassword(req.body.password)
		.then((isMatch) => {
		// password 일치 안 할 시
			if(!isMatch) {
				return res.send('비밀번호가 일치하지 않습니다.');
			}
		});
		// password 일치 시
		// return res.send('로그인 되었습니다.');
		user
		.generateToken()
		.then((user) => {
			res
			.cookie("x_auth", user.token)
			.status(200)
			.send('로그인 되었습니다.');
		})
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// auth 미들웨어 가져오기
// auth 미들웨어에서 필요한 것: token을 찾아 검증
userController.auth = auth,(req, res) => {
	res.status(200).json({
		_id: req._id,
		isAuth: true,
		email: req.user.email
	});
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