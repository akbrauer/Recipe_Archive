"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT || 3000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('My server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//Allow CORS Middleware (Replace with vite proxy config)
// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', "http://localhost:5173");
//     return next();
// })
//Logging Middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log('--------------------------------');
//     console.log(`Request: ${req.method} ${req.url}`);
//     return next();
// });
//Add API Routes
// const apiRouter = express.Router();
// apiRouter.get("/home", (req: Request, res: Response) => {
//     return res.send({message: 'Home page data from Express!'});
// })
// apiRouter.get('/about', (req: Request, res: Response) => {
//     return res.send({message: 'About page API data'});
// })
// apiRouter.get('/contact', (req: Request, res: Response) => {
//     res.send({message: 'This is Express! Here are the contacts!'});
// });
// app.use('/api', apiRouter);
// app.listen(port, host, () => {
//     console.log(`[server]: Server is listening on ${host}:${port}`);
// });
