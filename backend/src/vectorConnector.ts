import express, { Request, Response, Router, RequestHandler, NextFunction } from 'express';
import { addDocumentWithEmbedding, generateCV, client } from './mongoServices';

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
    const { content, userId, company, title, resultType } = req.body;
    console.log(req.body);
    if (!content || typeof content !== 'string') {
        res.status(400).json({ error: 'Text query is required' });
        return;
    }

    try {
        const results = await generateCV(content, userId, company, title, resultType);
        res.json(results)
    } catch (error) {
        console.error('Error querying documents:', error);
        res.status(500).json({ error: 'An error occurred while querying documents' });
    }
  }

const getDocumentsHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req.body;
    if(!userId){
        res.status(500).json({ error: 'An error occurred while querying documents' });
        return
    }

    try {
        await client.connect();
        const db = client.db("users");
        const usersCollection = db.collection('userContents');

        const results = await usersCollection.find({ userId: userId }).toArray();

        res.json(results);
    } catch (error) {
        console.error('Error querying documents:', error);
        res.status(500).json({ error: 'An error occurred while querying documents' });
    } finally {
        await client.close();
    }
};


vectorRouter.post('/add-document', addDocumentHandler);
vectorRouter.post('/generate-cv', queryDocumentsHandler);

vectorRouter.post('/documents', getDocumentsHandler); //get a list of documents

export default vectorRouter;
