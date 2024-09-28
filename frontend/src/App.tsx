import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submit', { text: inputText });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  
  return (
    <>
      <div className="text-6xl font-montser mb-4">
        nothing
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-2 w-64"
          placeholder="Enter text here"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
