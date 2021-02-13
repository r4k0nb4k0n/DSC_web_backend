# User

1. 회원가입 구현

   ```javascript
   // router
   // post로 클라이언트가 DB로 정보보내기
   userRoutes.post('/signup', asyncWrapper(userController.userCreate));
   ```

   ```javascript
   // model
   const userSchema = new Schema({
   	email: {
   		type: String, 
   		required: true,
   		unique: true,
   		trim: true,
   	},
   	password: {
   		type: String
   	},
   	createdAt: {
   		type: Date,
   		default: Date.now
   	}
   });
   ```

   ```javascript
   // controller
   // 회원가입 로직
   // email, password 회원가입
   import { userModel } from "./user.model";
   import { StatusCodes, ReasonPhrases } from "http-status-codes";
   
   const userController = {};
   
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
   ```

   mvc 패턴으로 간단하게 회원가입 로직을 구현했다.

   사용자가 이메일, 비밀번호를 post하면 .create를 통해 DB에 "email", "password"에 저장됨  



2. password 복호화하여 저장

   평문 저장시 해킹 위험이 커 bcrypt 모듈을 이용해 복호화하여 저장

   ```javascript
   import bcrypt from "bcrypt";
   const saltRounds = 10;
   
   // password 암호화
   userSchema.pre("save", function(next) {
   	let user = this;
   
   	if (user.isModified('password')) {
   		bcrypt.genSalt(saltRounds, function(err, salt) {
   			if (err)
   				return next(err);
   			bcrypt.hash(user.password, salt, function(err, hash) {
   				if (err)
   					return next(err);
   				user.password = hash;
   				next();
   			}); 
   		});
   	} else
   		next();
   });
   ```

   password가 저장되는 save 함수가 실행되기 전에 bcrypt 모듈을 이용해 password와 salt를 해싱하고 그 값을 password로 대체한다.



2. 로그인 구현

   회원가입 된 유저가 email, password를 입력해 로그인을 시도하면

   db에 해당 email이 있는지 먼저 검색 후

   해싱된 password값이랑 일치 일치 되는 지 비교한다

   ```java script
   // route
   userRoutes.post('/signin', asyncWrapper(userController.login));
   ```

   ```javascript
   // model
   userSchema.methods.comparePassword = function(plainPassword) {		
   	return bcrypt
   	.compare(plainPassword, this.password)
   	.then((isMatch) => isMatch)
   	.catch((err) => err); 
   };
   ```

   

