import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import apiRouter from "./routes/api";

dotenv.config();

const host = process.env.SERVER_HOST || "http://localhost";
const port = Number(process.env.PORT) || 3000;

const app: Express = express();
app.use(express.json());

//Allow CORS Middleware (Replace with vite proxy config)
// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', "http://localhost:5173");
//     return next();
// })

//Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('--------------------------------');
    console.log(`Request: ${req.method} ${req.url}`);
    return next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Typescript Express!');
})

app.use('/api', apiRouter);

app.listen(port, host, () => {
    console.log(`[server]: Server is listening on ${host}:${port}`);
});