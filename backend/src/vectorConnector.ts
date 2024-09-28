import express, { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { addDocumentWithEmbedding, searchSimilarDocuments } from './mongoServices';

const vectorRouter: Router = express.Router();

const addDocumentHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { content, userId, subject } = req.body;
    console.log(req.body);

    try {
        const insertedId = await addDocumentWithEmbedding(content, userId, subject);
        res.json({ message: 'Document added successfully', insertedId });
    } catch (error) {
        console.error('Error adding document:', error);
        res.status(500).json({ error: 'An error occurred while adding the document' });
    }
};




const queryDocumentsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body;
    console.log(req.body);
    if (!content || typeof content !== 'string') {
        res.status(400).json({ error: 'Text query is required' });
        return;
    }

    const limitNumber = 5;

    try {
        const results = await searchSimilarDocuments(content, limitNumber);
        res.json(results);
    } catch (error) {
        console.error('Error querying documents:', error);
        res.status(500).json({ error: 'An error occurred while querying documents' });
    }
};

vectorRouter.post('/add-document', addDocumentHandler);
vectorRouter.post('/query', queryDocumentsHandler);

export default vectorRouter;
