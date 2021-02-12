import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const saltRounds = 10;

const Schema = mongoose.Schema;

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
	token: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

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

// 암호화된 password랑 user가 작성한 password 비교
userSchema.methods.comparePassword = function(plainPassword) {		// comparePassword: 사용자 정의 메소드
	return bcrypt
	.compare(plainPassword, this.password)
	.then((isMatch) => isMatch)
	.catch((err) => err); 
};

// 토큰 생성
userSchema.methods.generateToken = function() {
	const token = jwt.sign(this._id.toHexString(),"zeze");
	this.token = token;
	return this.save()
	.then((user) => user);
	// .catch((err) => err);
};

// token을 통해 user 정보 가져오기
userSchema.statics.findByToken = function (token) {
	let user = this;
	// secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해 DB에 접근해서 유저의 정보를 가져온다
	return jwt.verify(token, "zeze", function(err, decoded) {	// jwt.verify(token, "지정해둔 특정 문자")
		return user
		.findOne({_id: decoded, token: token})
		.then((user) => user)
		.catch((err) => err);
	});
};

// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};