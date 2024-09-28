import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";
dotenv.config();
import { monStatus } from './mongoStatus';
import { readJsonFile, fetchJobs } from "./api"

const app: Express = express();
const port = process.env.PORT || 3000;
const jobsApiKey : string = process.env.API_KEY || "";

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const result : any = await readJsonFile();
  res.json(result);
});

monStatus().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


