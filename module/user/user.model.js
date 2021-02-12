import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
userSchema.methods.comepar

// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};