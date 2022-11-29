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
const foldersRouter = require("./routes/foldersRouter");
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 500, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const corsOption = {
	origin: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
	credentials: true,
};
// Middlewears
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(xss());
app.use("/api", apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
	res.json({ data: "<h1>Server running!</h1>" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authentication, notesRouter);
app.use("/api/v1/folders", authentication, foldersRouter);
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
