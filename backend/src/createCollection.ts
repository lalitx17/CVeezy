import { client } from "./mongoServices";


export async function createUserContentsCollection() {
  try {
    await client.connect();
    const db = client.db("users");

    // Check if the collection exists
    const collections = await db.listCollections({ name: "userContents" }).toArray();

    if (collections.length === 0) {
      // Collection doesn't exist, so create it
      await db.createCollection("userContents", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["content", "embeddings", "userId", "subject"],
            properties: {
              content: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              embeddings: {
                bsonType: "array",
                items: {
                  bsonType: "double"
                },
                description: "must be an array of numbers (doubles) and is required"
              },
              userId: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              subject: {
                bsonType: "string",
                description: "must be a string and is required"
              }
            }
          }
        }
      });

      console.log("userContents collection created successfully");

      // Create an index on the embeddings field for vector search
      await db.collection("userContents").createIndex(
        { embeddings: "2dsphere" },
        { name: "embeddings_vector_index" }
      );

      console.log("Vector index created on embeddings field");
    } else {
      console.log("userContents collection already exists");
    }
  } catch (error) {
    console.error("Error creating userContents collection:", error);
    throw error;
  } finally {
    await client.close();
  }
}
