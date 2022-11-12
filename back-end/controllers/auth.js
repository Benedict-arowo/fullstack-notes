const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const login = async (req, res) => {
	res.send("Howdy Login!").status(StatusCodes.OK);
	throw new Error("lol");
};

const register = async (req, res) => {
	const newUser = await User.create(req.body);
	const token = newUser.getToken();
	res.json({ status: "success", token }).status(StatusCodes.CREATED);
};

module.exports = { login, register };
