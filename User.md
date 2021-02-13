# User

1. 회원가입 구현

   ```javascript
   // router
   // post로 클라이언트가 DB로 정보보내기
   userRoutes.post("/signup", asyncWrapper(userController.userCreate));
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
       type: String,
     },
     createdAt: {
       type: Date,
       default: Date.now,
     },
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
         password: req.body.password,
       });
       return res.json(user);
     } catch (error) {
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .send("중복된 이메일입니다.");
     }
   };
   ```

   mvc 패턴으로 간단하게 회원가입 로직을 구현했다.

   모델에서 email을 unique라고 설정했기에 중복된 email 입력 시 회원가입 되지 않게 설정했다.

   아직 프론트단이랑 합치지 않아서 에러시 res.send만 선언되게 작성했는데 어떻게 할 지 논의해봐야 한다.

   사용자가 이메일, 비밀번호를 post하면 .create를 통해 DB에 "email", "password"에 저장됨

2. password 복호화하여 저장

   평문 저장시 해킹 위험이 커 bcrypt 모듈을 이용해 복호화하여 저장

   ```javascript
   import bcrypt from "bcrypt";
   const saltRounds = 10;
   
   // password 암호화
   userSchema.pre("save", function (next) {
     let user = this;
   
     if (user.isModified("password")) {
       bcrypt.genSalt(saltRounds, function (err, salt) {
         if (err) return next(err);
         bcrypt.hash(user.password, salt, function (err, hash) {
           if (err) return next(err);
           user.password = hash;
           next();
         });
       });
     } else next();
   });
   ```

   password가 저장되는 save 함수가 실행되기 전에 bcrypt 모듈을 이용해 password와 salt를 해싱하고 그 값을 password로 대체한다.

   salt로 무작위 단어를 새로운 해시값을 추가로 password에 적용함

   

   🍓이미 짠 해시함수에 소금을 뿌리자!🍓

   비밀번호는 해시함수값으로 DB에 저장하는데

   Rainbow Table에 해시값 적용하면 기존 비밀번호(plainPassword)를 알 수 있음

   

   [리빙포인트]

   Rainbow Table에는 흔히 쓰는 단어들의 해시값이 저장되었으므로 비밀번호 만들 때는 단어가 아닌 무작위 글씨, 특수기호 조합으로 만들자 ^^!

   

3. 로그인 구현

   회원가입 된 유저가 email, password를 입력해 로그인을 시도하면

   db에 해당 email이 있는지 먼저 검색 후

   해싱된 password값이랑 일치 일치 되는 지 비교한다

   ```java script
   // route
   userRoutes.post('/signin', asyncWrapper(userController.login));
   ```

   ```javascript
   // model
   userSchema.methods.comparePassword = function (plainPassword) {
     return bcrypt
       .compare(plainPassword, this.password)
       .then((isMatch) => isMatch)
       .catch((err) => err);
   };
   ```

   ```javascript
   // 로그인시 DB에 저장된 email 먼저 찾고, email 있다면 암호화된 password랑 user가 입력한 password 비교
   userController.login = async (req, res) => {
     try {
   		const user = await userModel.findOne({
         // email 먼저 비교
   			email: req.body.email
   		});
       if (!user) {
         return res
           .status(StatusCodes.BAD_REQUEST)
   				.send('가입 되지 않은 회원입니다.');
   				// .redirect("/api-docs");
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
   		res.send('로그인 되었습니다.');
   		})
     } catch (error) {
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ error: error.toString() });
     }
   };
   ```

   .findOne을 통해 DB에서 email을 찾는다

   email이 있을 시 model 파일에 작성된 comparePassword(plainPassword)가 실행된다.

   입력 받은 req.body.password를 인자로 받은 comparePassword는

   bcrypt.compare 함수를 통해 req.body.password와 해싱된 password를 비교한다.

   일치 시 토큰을 user에게 부여하고 로그인 시킨다.

4. 토큰 부여

   ```javascript
   // model
   // 토큰 생성
   userSchema.methods.generateToken = function () {
     const token = jwt.sign(this._id.toHexString(), "zeze"); // secretKey
     this.token = token;
     return this.save().then((user) => user);
     // .catch((err) => err);
   };
   ```

   `jwt.sign(payload, secretKey)`에서 payload는 string 형식이어야 한다.

   그러나 mongodb에서 생성되는 \_id는 정수이므로 mongodb 함수인`.toHexString()`를 통해 형변환 해줘야 한다.

   생성된 토큰은 DB에 저장해야 하므로 model에 token을 추가로 만들어준다.

   ```javascript
   // model
   const userSchema = new Schema({
   	...,
   	token: {
   		type: String
   	},
   	...
   });
   ```

   ```javascript
   // controller
   userController.login = async (req, res) => {
     try {
       const user = await userModel.findOne({
         // email 먼저 비교
         email: req.body.email,
       });
       if (!user) {
         return res
           .status(StatusCodes.BAD_REQUEST)
           .send("가입 되지 않은 회원입니다.");
       }
       user.comparePassword(req.body.password).then((isMatch) => {
         // password 일치 안 할 시
         if (!isMatch) {
           return res.send("비밀번호가 일치하지 않습니다.");
         }
       });
       // password 일치 시
       user.generateToken().then((user) => {
         res
           .cookie("x_auth", user.token)
           .status(200)
           .send("로그인 되었습니다.");
       });
     } catch (error) {
       return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ error: error.toString() });
     }
   };
   ```

   다시 login cotroller로 돌아가서 password가 일치된 user에 한해서 token을 부여한다.

   user.generateToken()을 통해 token을 만들고 cookie에 쿠키에 token을 저장하여

   유저가 서버에 request할 때마다 서버는 token이 일치하는지만 검증하면 된다.

   

   🍒JWT에 대해 알아보자🍒

   Token Based Auth

   ![image-20210213171222116](C:\Project\DSC_web_backend\토큰1.png)

   JWT

   헤더: Algorithm, Token type

   - 어떤 알고리즘으로 인크립션(암호화)할건지 결정
   
     ```json
     {
       "alg": "HS256",
       "typ": "JWT"
  }
     ```

   페이로드: Data

   - 개발자가 원하는 걸 저장하면 된다.

   - 네트워크에 정보가 올라가므로 최소한의 데이터만 저장하는 걸 권장
   
     ```json
     {
         "id": "1223034", // 사용자 unique id
         "exp": 21313, 	 // 토큰 만료기간
         ...,
         "CreditCardNum": 3242342	// 절대 X, 헤더와 페이로드는 암호화되지 않음
  }
     ```

   시그니쳐

   - 헤더와 페이로드에 시크릿키를 추가한 채 저장
   
     ```json
     HMACSHA256(
       base64UrlEncode(header) + "." + base64UrlEncode(payload),
       ZEZE // SECRET KET
     )
     ```
