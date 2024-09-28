"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoServices_1 = require("./mongoServices");
const vectorRouter = express_1.default.Router();
const addDocumentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, userId, subject } = req.body;
    console.log(req.body);
    try {
        const insertedId = yield (0, mongoServices_1.addDocumentWithEmbedding)(content, userId, subject);
        res.json({ message: 'Document added successfully', insertedId });
    }
    catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ error: 'An error occurred while adding the document' });
    }
});
const queryDocumentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    console.log(req.body);
    if (!content || typeof content !== 'string') {
        res.status(400).json({ error: 'Text query is required' });
        return;
    }
    const limitNumber = 5;
    try {
        const results = yield (0, mongoServices_1.searchSimilarDocuments)(content, limitNumber);
        res.json(results);
    }
    catch (error) {
        console.error('Error querying documents:', error);
        res.status(500).json({ error: 'An error occurred while querying documents' });
    }
});
vectorRouter.post('/add-document', addDocumentHandler);
vectorRouter.post('/query', queryDocumentsHandler);
exports.default = vectorRouter;
