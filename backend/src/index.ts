import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import cors from 'cors';
import { monStatus, client } from './mongoStatus';
import { perplexityQuery } from "./perplexityApi.ts"
import { readJsonFile, fetchJobs } from "./jobsApi.ts"

const app: Express = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const jobsApiKey : string = process.env.API_KEY || "";
const perplexityApiKey : string = process.env.PERPLEXITY_API_KEY || "";

app.get('/', async (req: Request, res: Response) => {
  res.json({message: "everything works fine"})
});

app.post('/submit', (req, res) => {
    const { text } = req.body;
    console.log('Received text:', text);
    res.json({ message: 'Data received successfully' });
  });


app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await client.db('users').collection('users').findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await client.db('users').collection('users').insertOne({
    username,
    password: hashedPassword
  });

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await client.db('users').collection('users').findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});



monStatus().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


