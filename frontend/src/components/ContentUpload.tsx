import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import { useAuth } from './useAuth.tsx';
 
const ContentUpload: React.FC = () => {
  const { userId } = useAuth();
  const [subject, setSubject] = useState('');
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
 
  interface Document {
    subject: string;
    content: string;
  }
 
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.post('/documents', { userId: userId });
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, [userId]);
 
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const text = await pdfToText(file);
        setInputText(text);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Failed to extract text from PDF");
      }
    } else {
      setErrorMessage("No file selected");
    }
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/add-document', { subject, content: inputText, userId });
      setSubject('');
      setInputText('');
      // Refresh documents list
      const response = await axios.post('/documents', { userId });
      setDocuments(response.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
 
  const getPreviewText = (content: string): string => {
    const words = content.split(' ');
    return words.slice(0, 100).join(' ') + (words.length > 100 ? '...' : '');
  };
 
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-900 text-white min-h-screen">
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-blue-400">Upload Your Content</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mb-4 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject..."
            />
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-64 px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter your content here or upload a PDF to extract text..."
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold text-blue-400">Previously Submitted Documents</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-[calc(100vh-12rem)] overflow-y-auto">
          {documents.length > 0 ? (
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="bg-gray-700 p-4 rounded-md">
                  <h3 className="font-semibold text-lg text-blue-300 mb-2">{doc.subject}</h3>
                  <p className="text-gray-300 text-sm">{getPreviewText(doc.content)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No documents submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default ContentUpload;
