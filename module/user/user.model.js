import mongoose from "mongoose";
// import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String, 
		required: true,
		unique: true,
	},
	password: {
		type: String
	}
});
// create model
const userModel = mongoose.model('user', userSchema); 
export{userModel};