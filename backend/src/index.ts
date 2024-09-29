import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import cors from 'cors';
import { client } from './mongoServices';
import jobsRouter from "./jobsApi"
import pdfRouter from "./exportPdf"
import vectorRouter from './vectorConnector';
import authRouter from './auth';


const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const jobsApiKey : string = process.env.API_KEY || "";


app.use(vectorRouter);
app.use(jobsRouter);
app.use(pdfRouter);
app.use('/auth', authRouter); 



app.get('/', async (req: Request, res: Response) => {
  res.json({message: "everything works fine"})
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


