const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const login = async (req, res) => {
	const { username, password } = req.body;
	let user = await User.findOne({ username: username });
	// If user does not exist.
	if (!user) {
		return res.json({
			msg: `Could not find user with the username of ${username}`,
		});
	}
	// Compares the password saved in the database with the one the provided by the user.
	const compare = user.verifyPassword(password);
	if (!compare) {
		return res.json({ msg: "Password does not match" });
	}
	// Generates an access token for the user.
	const token = user.getToken();
	user = user.toObject(); // Converts the databases results to an object.
	delete user.password; // removes the user's password to prevent sending it back
	res.json({ msg: "success", token, user }).status(StatusCodes.OK);
};

const register = async (req, res) => {
	const newUser = await User.create(req.body);
	const token = newUser.getToken(); // Generates an access token for the user
	res.json({ status: "success", token }).status(StatusCodes.CREATED);
};

module.exports = { login, register };
