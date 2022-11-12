require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username field is required!"],
		unique: true,
		minLength: [6, "Username length must be more than 6 characters."],
		maxLength: [16, "Username length can't be more than 16"],
	},
	password: {
		type: String,
		required: [true, "Password field is required!"],
		minLength: [12, "Password length must be more than 12 characters"],
	},
});

userSchema.pre("save", function () {
	const salt = bcrypt.genSaltSync(12);
	this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.getToken = function () {
	return jwt.sign(
		{ id: this._id, username: this.username },
		process.env.JWT_SECRET,
		{
			expiresIn: "16d",
		}
	);
};

module.exports = mongoose.model("Users", userSchema);
