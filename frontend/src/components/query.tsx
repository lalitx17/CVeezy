import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const Query: React.FC = ({ updateCvCallback, changePageCallback }) => {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/query', {
        content: inputText,
        userId: userId,
      });
      console.log('Response from server:', response.data);

      setInputText('');
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const handleGenerateCV = async (e: React.FromEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading when request starts
    try {
      console.log(userId);
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
      setLoading(false); // Stop loading after request completes
    }
  };


  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Manual Job Entry</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring focus:ring-blue-500"
        placeholder="Job Title"
      />
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:ring focus:ring-blue-500"
        placeholder="Employer"
      />
      <form onSubmit={handleGenerateCV} className="w-full max-w-2xl">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full h-96 resize-none focus:ring focus:ring-blue-500"
          placeholder="Job Description"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
        >
          Submit
        </button>
      </form>
    {/* Spinner overlay */}
    {loading && (
      <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-50">
        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )}
    </div>
  );
};

export default Query;
