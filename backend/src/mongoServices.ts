import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import { perplexityQuery } from "./perplexityApi";

dotenv.config();

const uri = `mongodb+srv://lalitx17:${process.env.MONGODB_PASSWORD}@cluster0.c36pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function monStatus() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}

export async function addDocumentWithEmbedding(
  content: string,
  userId: string,
  subject: string
) {
  try {
    // Check if content is empty or undefined
    if (!content || content.trim() === "") {
      throw new Error("Content cannot be empty");
    }

    await client.connect();
    const db = client.db("users");
    const collection = db.collection("userContents");

    // Generate embedding
    let embedding;
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: content.trim(), // Ensure content is trimmed
      });
      embedding = embeddingResponse.data[0].embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw error; // Re-throw to be caught by the outer try-catch
    }

    // Insert document with embedding
    const result = await collection.insertOne({
      content: content,
      embeddings: embedding,
      userId: userId,
      subject: subject,
    });

    console.log(`Document inserted with _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error; // Re-throw the error to be handled by the caller
  } finally {
    await client.close();
  }
}

export async function searchSimilarDocuments(
  queryText: string,
  userId: string,
  limit: number = 100
) {
  try {
    await client.connect();
    const db = client.db("users");
    const collection = db.collection("userContents");

    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: queryText,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding;

    console.log("Query embedding generated successfully");

    const results = await collection
      .aggregate([
        {
          $vectorSearch: {
            index: "vectorSearch",
            path: "embeddings",
            queryVector: queryEmbedding,
            numCandidates: 10000,
            limit: limit,
          },
        },
        {
          $match: { userId: userId },
        },
        {
          $project: {
            content: 1,
            userId: 1,
            subject: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    console.log(`Found ${results.length} documents for user ${userId}`);

    // Format and log the results
    results.forEach((doc, index) => {
      console.log(`Document ${index + 1}:`);
      console.log(`Content: ${doc.content}`);
      console.log(`User ID: ${doc.userId}`);
      console.log(`Subject: ${doc.subject}`);
      console.log(`Similarity Score: ${doc.score}`);
      console.log("---");
    });

    return results.map((doc) => doc.content);
  } catch (error) {
    console.error("Error in searchSimilarDocuments:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function generateCV(content: string, userId: string, company: string, title: string, resultType: string){
  const contents = await searchSimilarDocuments(content, userId);
  if(contents.length > 0){
  const result = await perplexityQuery(content, contents.join(" "), resultType, company, title);
  return result;
  }
}
