const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const login = async (req, res) => {
	const { username, password } = req.body;
	let user = await User.findOne({ username: username.toLowerCase() });
	// If user does not exist.
	if (!user) {
		return res.json({
			msg: `Could not find user with the username of ${username}`,
		}); // Throw an error here
	}
	// Compares the password saved in the database with the one the provided by the user.
	const compare = user.verifyPassword(password);
	if (!compare) {
		return res.json({ msg: "Password does not match" }); // Throw an error here
	}
	// Generates an access token for the user.
	const token = user.getToken();
	user = user.toObject(); // Converts the databases results to an object.
	delete user.password; // removes the user's password to prevent sending it back
	res.json({ msg: "success", token, user }).status(StatusCodes.OK);
};

const register = async (req, res) => {
	if (!req.body || !req.body.username || !req.body.email) {
		throw new Error("Invalid credientials");
	}
	const newUser = await User.create({
		...req.body,
		email: req.body.email.toLowerCase(),
		username: req.body.username.toLowerCase(), // Saves all username, and email in lowercase to make it case insensitive when trying to login.
	});
	const token = newUser.getToken(); // Generates an access token for the user
	res.json({ status: "success", token }).status(StatusCodes.CREATED);
};

module.exports = { login, register };
