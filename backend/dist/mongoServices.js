"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.monStatus = monStatus;
exports.addDocumentWithEmbedding = addDocumentWithEmbedding;
exports.searchSimilarDocuments = searchSimilarDocuments;
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
const openai_1 = require("openai");
dotenv.config();
const uri = `mongodb+srv://lalitx17:${process.env.MONGODB_PASSWORD}@cluster0.c36pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
exports.client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
function monStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            yield exports.client.close();
        }
    });
}
function addDocumentWithEmbedding(content, userId, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if content is empty or undefined
            if (!content || content.trim() === '') {
                throw new Error("Content cannot be empty");
            }
            yield exports.client.connect();
            const db = exports.client.db("users");
            const collection = db.collection("userContents");
            // Generate embedding
            let embedding;
            try {
                const embeddingResponse = yield openai.embeddings.create({
                    model: "text-embedding-ada-002",
                    input: content.trim(), // Ensure content is trimmed
                });
                embedding = embeddingResponse.data[0].embedding;
            }
            catch (error) {
                console.error("Error generating embedding:", error);
                throw error; // Re-throw to be caught by the outer try-catch
            }
            // Insert document with embedding
            const result = yield collection.insertOne({
                content: content,
                embeddings: embedding,
                userId: userId,
                subject: subject
            });
            console.log(`Document inserted with _id: ${result.insertedId}`);
            return result.insertedId;
        }
        catch (error) {
            console.error("Error adding document:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
        finally {
            yield exports.client.close();
        }
    });
}
function searchSimilarDocuments(queryText_1, userId_1) {
    return __awaiter(this, arguments, void 0, function* (queryText, userId, limit = 100) {
        try {
            yield exports.client.connect();
            const db = exports.client.db("users");
            const collection = db.collection("userContents");
            const embeddingResponse = yield openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: queryText,
            });
            const queryEmbedding = embeddingResponse.data[0].embedding;
            console.log("Query embedding generated successfully");
            const results = yield collection.aggregate([
                {
                    $vectorSearch: {
                        index: "vectorSearch",
                        path: "embeddings",
                        queryVector: queryEmbedding,
                        numCandidates: 10000,
                        limit: limit
                    }
                },
                {
                    $match: { userId: userId }
                },
                {
                    $project: {
                        content: 1,
                        userId: 1,
                        subject: 1,
                        score: { $meta: "vectorSearchScore" }
                    }
                }
            ]).toArray();
            console.log(`Found ${results.length} documents for user ${userId}`);
            // Format and log the results
            results.forEach((doc, index) => {
                console.log(`Document ${index + 1}:`);
                console.log(`Content: ${doc.content}`);
                console.log(`User ID: ${doc.userId}`);
                console.log(`Subject: ${doc.subject}`);
                console.log(`Similarity Score: ${doc.score}`);
                console.log('---');
            });
            return results;
        }
        catch (error) {
            console.error("Error in searchSimilarDocuments:", error);
            throw error;
        }
        finally {
            yield exports.client.close();
        }
    });
}
