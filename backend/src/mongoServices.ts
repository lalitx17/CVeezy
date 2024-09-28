import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from "dotenv";
import { OpenAI } from 'openai';

dotenv.config();

const uri = `mongodb+srv://lalitx17:${process.env.MONGODB_PASSWORD}@cluster0.c36pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



export async function monStatus() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export async function addDocumentWithEmbedding(text: string) {
  try {
    await client.connect();
    const db = client.db("your_database_name");
    const collection = db.collection("your_collection_name");

    // Generate embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    const embedding = embeddingResponse.data[0].embedding;

    // Insert document with embedding
    const result = await collection.insertOne({
      text: text,
      embedding: embedding,
    });

    console.log(`Document inserted with _id: ${result.insertedId}`);
    return result.insertedId;
  } finally {
    await client.close();
  }
}



export async function searchSimilarDocuments(queryText: string, limit: number = 5) {
  try {
    await client.connect();
    const db = client.db("your_database_name");
    const collection = db.collection("your_collection_name");


    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: queryText,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    // Perform vector search
    const results = await collection.aggregate([
      {
        $vectorSearch: {
          index: "default",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit
        }
      },
      {
        $project: {
          text: 1,
          score: { $meta: "vectorSearchScore" }
        }
      }
    ]).toArray();

    return results;
  } finally {
    await client.close();
  }
}
