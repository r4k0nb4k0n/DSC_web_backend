const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
	email: {
		type: String, 
		required: true,
		unique: true,
	},
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