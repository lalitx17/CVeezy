import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import { useAuth } from './useAuth.tsx';

const ContentUpload: React.FC = () => {
  const { userId } = useAuth();
  const [subject, setSubject] = useState('');
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.post('http://localhost:3000/documents', {
          userId: userId,
        });
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    pdfToText(file)
      .then(text => setInputText(text))
      .catch(error => setErrorMessage("Failed to extract text from pdf: " + error));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/add-document', {
        subject: subject,
        content: inputText,
        userId: userId,
      });
      console.log('Response from server:', response.data);
      setSubject('');
      setInputText('');
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start">
      {/* Submission Column */}
      <div className="flex flex-col w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Upload Your Content</h2>

        {/* File input for PDF upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4"
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring focus:ring-blue-500"
            placeholder="Enter subject..."
          />

          {/* Textarea to display extracted PDF content */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full h-96 resize-none focus:ring focus:ring-blue-500"
            placeholder="Enter your content here or upload a PDF to extract text..."
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Documents Column */}
      <div className="flex flex-col w-full md:w-1/2 p-4 h-96 overflow-y-auto border border-gray-300 rounded-lg h-[80vh]">
        <h2 className="text-xl font-bold mb-4">Previously Submitted Documents</h2>
        {documents.length > 0 ? (
          <ul className="list-disc pl-5">
            {documents.map((doc, index) => (
              <li key={index} className="mb-2">
                <h3 className="font-semibold">{doc.subject}</h3>
                <p>{doc.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContentUpload;
