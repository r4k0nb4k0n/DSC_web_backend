import { userModel } from "./user.model";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
// import { body, validationResult } from "validator";

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
      // .json({ error: error.toString() });
			.send('중복된 이메일입니다.');
  }
};

// 로그인
userController.login = async (req, res) => {
  try {
		const user = await userModel.findOne({
      email: req.body.email,
			password: req.body.password
		});
    // const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        // .json({ message: "user not found" });
				.send('가입 되지 않은 회원입니다.');
				// .redirect("/api-docs");														// 로그인 화면으로 다시 redirect
    }
		// 가입된 회원인 경우 토큰 인증 함수 실행
		return userController.userSession(user);
    // return res.json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

userController.userSession = async (req, user) => {
  try {
    const users = user;
    return res.json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

// JWT
/*
userController.
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
*/
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