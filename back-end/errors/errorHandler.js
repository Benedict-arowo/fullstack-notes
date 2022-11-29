const { StatusCodes } = require("http-status-codes");

const ErrorHandler = (err, req, res, next) => {
	// Need to handle error made from customError Class
	console.log(err.name);
	if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
		return res.status(StatusCodes.UNAUTHORIZED).json({ err: "UNAUTHORIZED" });
	}
	res.status(StatusCodes.BAD_REQUEST).json({ err: err.message });
};

module.exports = ErrorHandler;
