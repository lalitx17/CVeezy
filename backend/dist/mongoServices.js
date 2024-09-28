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
exports.monStatus = monStatus;
exports.addDocumentWithEmbedding = addDocumentWithEmbedding;
exports.searchSimilarDocuments = searchSimilarDocuments;
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
const openai_1 = require("openai");
dotenv.config();
const uri = `mongodb+srv://lalitx17:${process.env.MONGODB_PASSWORD}@cluster0.c36pc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
function monStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            yield client.close();
        }
    });
}
function addDocumentWithEmbedding(content, userId, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db("users");
            const collection = db.collection("user_contents");
            // Generate embedding
            const embeddingResponse = yield openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: content,
            });
            const embedding = embeddingResponse.data[0].embedding;
            // Insert document with embedding
            const result = yield collection.insertOne({
                content: content,
                embedding: embedding,
                userId: userId,
                subject: subject
            });
            console.log(`Document inserted with _id: ${result.insertedId}`);
            return result.insertedId;
        }
        finally {
            yield client.close();
        }
    });
}
function searchSimilarDocuments(queryText_1) {
    return __awaiter(this, arguments, void 0, function* (queryText, limit = 5) {
        try {
            yield client.connect();
            const db = client.db("users");
            const collection = db.collection("users_contents");
            const embeddingResponse = yield openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: queryText,
            });
            const queryEmbedding = embeddingResponse.data[0].embedding;
            // Perform vector search
            const results = yield collection.aggregate([
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
        }
        finally {
            yield client.close();
        }
    });
}
