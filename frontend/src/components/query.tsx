import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

interface QueryProps {
  updateCvCallback: (input: string) => void;
  changePageCallback: () => void;
}

const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  return (
    <button 
      onClick={onClick} 
      className="px-8 py-4 mx-auto text-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {children}
    </button>
  );
};

const Query: React.FC<QueryProps> = ({ updateCvCallback, changePageCallback }) => {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const handleGenerateCV = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/generate-cv', {
        content: inputText,
        userId: userId,
        company: company,
        title: title,
      });
      console.log('CV generated:', response.data);
      updateCvCallback(response.data.choices[0].message.content);
      changePageCallback();
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-blue-400">Manual Job Entry</h2>
      <div className="w-full max-w-2xl space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-700 rounded-lg px-4 py-3 w-full bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          placeholder="Job Title"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border-2 border-gray-700 rounded-lg px-4 py-3 w-full bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          placeholder="Employer"
        />
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border-2 border-gray-700 rounded-lg px-4 py-3 w-full h-64 resize-none bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          placeholder="Job Description"
        />
        <div className="flex justify-center mt-8">
          <Button onClick={handleGenerateCV}>
            Generate CV
          </Button>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Query;
