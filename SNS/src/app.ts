import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import apiRouter from './routers';
import { sequelize } from './config/Connection';
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import path from 'path';

const router = express.Router();
const app = express();
const port: number = 3000;

dotenv.config({ path: path.join(__dirname, '../../.env') });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('jwt-secret', process.env.secretkey);

app.use(morgan('dev'));

sequelize.sync()
    .then(() => {
    console.log('✓ DB connection success.');
    console.log('  Press CTRL-C to stop\n');
    })
    .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use('/api', apiRouter);
app.use('/', router);

app.use((err, req, res, next) => {
    res.status(404).json({
      message: err.message,
    });
});

app.listen(port, () => {
    console.log("app listening on port 3000!");
});