import express, { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { addDocumentWithEmbedding, searchSimilarDocuments } from './mongoServices';

const vectorRouter: Router = express.Router();

const addDocumentHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }

    try {
        const insertedId = await addDocumentWithEmbedding(text);
        res.json({ message: 'Document added successfully', insertedId });
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ error: 'An error occurred while adding the document' });
    }
};

const queryDocumentsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { text, limit } = req.query;
    if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'Text query is required' });
        return;
    }

    const limitNumber = limit ? parseInt(limit as string) : 5;

    try {
        const results = await searchSimilarDocuments(text, limitNumber);
        res.json(results);
    } catch (error) {
        console.error('Error querying documents:', error);
        res.status(500).json({ error: 'An error occurred while querying documents' });
    }
};

vectorRouter.post('/add-document', addDocumentHandler);
vectorRouter.get('/query', queryDocumentsHandler);

export default vectorRouter;
