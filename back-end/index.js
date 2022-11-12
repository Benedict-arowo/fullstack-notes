require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const xss = require("xss-clean");
const db = require("./db/connectDB");
const authRouter = require("./routes/authRouter");
const notesRouter = require("./routes/notesRouter");
const errHandler = require("./errors/errorHandler");
const authentication = require("./middlewears/auth");
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middlewears
app.use(cors());
app.use(morgan("dev"));
app.use(xss());
app.use("/api", apiLimiter);
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
	res.send("<h1>Server running!</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authentication, notesRouter);

app.use(errHandler);

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
