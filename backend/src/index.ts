import express, { Express, Request, Response } from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import { monStatus } from './mongoStatus';
import { readJsonFile, fetchJobs, perplexityQuery } from "./api"

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const jobsApiKey : string = process.env.API_KEY || "";
const perplexityApiKey : string = process.env.PERPLEXITY_API_KEY || "";

app.get('/', async (req: Request, res: Response) => {
  //const result : any = await readJsonFile();
  //res.json(result);
  const result : any = await perplexityQuery(perplexityApiKey, "Give me a testing response");
  res.json(result)
});

app.post('/submit', (req, res) => {
    const { text } = req.body;
    console.log('Received text:', text);
    res.json({ message: 'Data received successfully' });
  });



monStatus().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


