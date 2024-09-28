import React, { useState } from 'react';

const Dashboard = () => {
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
    <div className='my-10'>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full h-64 resize-none"
          placeholder="Enter text here"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
        >
          Submit
        </button>
      </form>
      </div>
    </>
  );
}

export default Dashboard
