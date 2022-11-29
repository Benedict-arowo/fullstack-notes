require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
	if (!req.headers) throw new Error("Missing headers");

	let userToken = req.headers.authorization;

	if (!userToken) throw new Error("Missing signature.");

	if (!userToken.startsWith("Bearer")) throw new Error("Invalid signature.");
	userToken = userToken.split(" ")[1]; // Removing the "Bearer" from the token, and getting the token.
	try {
		req.user = jwt.verify(userToken, process.env.JWT_SECRET);
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authentication;
