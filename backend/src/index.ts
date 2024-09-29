import express, { Express, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import cors from 'cors';
import { client } from './mongoServices';
import { perplexityQuery } from "./perplexityApi"
import jobsRouter from "./jobsApi"
import pdfRouter from "./exportPdf"
import vectorRouter from './vectorConnector';
import { createUserContentsCollection } from './createCollection';

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

app.use(vectorRouter);
app.use(jobsRouter);
app.use(pdfRouter);

  app.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }
    
  try {
    await client.connect();

    const existingUser = await client.db('users').collection('users').findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.db('users').collection('users').insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(), // Optional: timestamp
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' });
    return
  }

  try {
    await client.connect();

    const user = await client.db('users').collection('users').findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'Invalid username or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid username or password' });
      return
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


