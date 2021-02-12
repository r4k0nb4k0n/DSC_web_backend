import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
	const token = jwt.sign(this._id.toHexString(),"secretToken");
	this.token = token;
	return this.save()
	.then((user) => user);
	// .catch((err) => err);
};

// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};