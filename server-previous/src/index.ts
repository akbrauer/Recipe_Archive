import express from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api";
dotenv.config();

const host = process.env.SERVER_HOST || "localhost";
const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow CORS Middleware (Replace with vite proxy config)
// app.use((req, res, next) => {
// 	res.set("Access-Control-Allow-Origin", "*");
// 	return next();
// });

//Logging Middleware
app.use((req, res, next) => {
	console.log("--------------------------------");
	console.log(`Request: ${req.method} ${req.url}`);
	return next();
});

app.get("/", (req, res) => {
	res.send("Hello Typescript Express!");
});

app.use("/api", apiRouter);

app.listen(port, () => {
	console.log(`[server]: Server is listening on ${port}`);
});
