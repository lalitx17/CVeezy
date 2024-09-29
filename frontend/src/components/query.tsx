import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const Query: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const {userId} = useAuth();

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

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Query the database</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full h-96 resize-none focus:ring focus:ring-blue-500"
          placeholder="Enter your content here..."
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Query;
