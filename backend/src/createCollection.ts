 import { client } from "./mongoServices";


// export async function createUserContentsCollection() {
//   try {
//     await client.connect();
//     const db = client.db("users");

//     // Check if the collection exists
//     const collections = await db.listCollections({ name: "userContents" }).toArray();

//     if (collections.length === 0) {
//       // Collection doesn't exist, so create it
//       await db.createCollection("userContents", {
//         validator: {
//           $jsonSchema: {
//             bsonType: "object",
//             required: ["content", "embeddings", "userId", "subject"],
//             properties: {
//               content: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               },
//               embeddings: {
//                 bsonType: "array",
//                 items: {
//                   bsonType: "double"
//                 },
//                 description: "must be an array of numbers (doubles) and is required"
//               },
//               userId: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               },
//               subject: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               }
//             }
//           }
//         }
//       });

//       console.log("userContents collection created successfully");

//       // Create an index on the embeddings field for vector search
//       await db.collection("userContents").createIndex(
//         { embeddings: "2dsphere" },
//         { name: "embeddings_vector_index" }
//       );

//       console.log("Vector index created on embeddings field");
//     } else {
//       console.log("userContents collection already exists");
//     }
//   } catch (error) {
//     console.error("Error creating userContents collection:", error);
//     throw error;
//   } finally {
//     await client.close();
//   }
// }





//code to create vector database


// export async function createVectorSearchIndex() {
//   try {
//     await client.connect();
//     const db = client.db("users");
//     const result = await db.command({
//       createSearchIndexes: "userContents",
//       indexes: [
//         {
//           name: "vectorSearch",
//           definition: {
//             mappings: {
//               dynamic: true,
//               fields: {
//                 embeddings: {
//                   type: "knnVector",
//                   dimensions: 1536,
//                   similarity: "cosine"
//                 }
//               }
//             }
//           }
//         }
//       ]
//     });
//     console.log("Vector search index created successfully:", result);
//   } catch (error) {
//     console.error("Error creating vector search index:", error);
//   } finally {
//     await client.close();
//   }
// }




// export async function createUsersCollection() {
//   try {
//     await client.connect();
//     const db = client.db("users");

//     // Check if the collection exists
//     const collections = await db.listCollections({ name: "userInfo" }).toArray();

//     if (collections.length === 0) {
//       // Collection doesn't exist, so create it
//       await db.createCollection("userInfo", {
//         validator: {
//           $jsonSchema: {
//             bsonType: "object",
//             required: ["userId", "username", "passwordHash"],
//             properties: {
//               userId: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               },
//               username: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               },
//               passwordHash: {
//                 bsonType: "string",
//                 description: "must be a string and is required"
//               }
//             }
//           }
//         }
//       });

//       console.log("Users collection created successfully");


//       await db.collection("userInfo").createIndexes([
//         { key: { userId: 1 }, unique: true },
//         { key: { username: 1 }, unique: true }
//       ]);

//       console.log("Indexes created on user collection");
//     } else {
//       console.log("Users collection already exists");
//     }
//   } catch (error) {
//     console.error("Error creating users collection:", error);
//     throw error;
//   } finally {
//     await client.close();
//   }
// }




