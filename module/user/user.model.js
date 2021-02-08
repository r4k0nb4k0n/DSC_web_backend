import mongoose from "mongoose";
// import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String, 
		required: true,
		unique: true,
		// validate: {
		// 	validator: validator.isEmail,
		// 	message: '{VALUE} is not a valid email'
		// }
	}
	// password: {
	// 	type: String
	// },
	// createdAt: {
	// 	type: Date, 
	// 	default: Date.now
	// }
});
// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};