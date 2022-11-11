require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const db = require("./db/connectDB");

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
app.use(cors());
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
	res.send("<h1>Server running!</h1>");
});

const start = async () => {
	try {
		await db(process.env.DB_URI);
		app.listen(PORT, () => {
			console.log(`Server listing to port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
