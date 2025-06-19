import serverless from "serverless-http";
import express from "express";
import cors from 'cors';
import apiRouter from "./routers/api";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Hello from root!");
});

app.get("/hello", (req, res, next) => {
  res.status(200);
  res.send("Hello from path!");
});

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send("Not Found");
});

export const handler = serverless(app);