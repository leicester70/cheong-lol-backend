// src/index.js
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { PetsController } from './Controller/PetsController';
const rfs = require('rotating-file-stream');
import morgan from 'morgan';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Setup the rotating file stream
let logDirectory = __dirname + '/../logs';
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

// configure this shit
app.use(express.json());
app.use(
    morgan(
        '[:date[web]] [:remote-addr] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
        { stream: accessLogStream }
    )
);
// supply routes
app.use('/pets', PetsController);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
