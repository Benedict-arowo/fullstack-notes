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
		minLength: [
			Number(process.env.MIN_PASSWORD_LENGTH),
			`Password length must be more than process ${process.env.MIN_PASSWORD_LENGTH} characters`,
		],
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

userSchema.methods.verifyPassword = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Users", userSchema);
