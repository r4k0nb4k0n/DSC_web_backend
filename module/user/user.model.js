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

// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};