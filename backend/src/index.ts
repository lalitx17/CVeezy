import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import cors from 'cors';
import jobsRouter from "./jobsApi"
import pdfRouter from "./exportPdf"
import vectorRouter from './vectorConnector';
import authRouter from './auth';
import path from 'path';



const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../../frontend/dist/')));
app.use(vectorRouter);
app.use(jobsRouter);
app.use(pdfRouter);
app.use('/auth', authRouter); 




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


