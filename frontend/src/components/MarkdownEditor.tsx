import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const MarkdownEditor: React.FC = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.post('http://localhost:3000/export-pdf', {
        inputText,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        alert("PDF export initiated successfully!");
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert("Failed to export PDF.");
    }
  };


  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Generated Cover Letter</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-lg px-3 py-2 w-full h-96 resize-none focus:ring focus:ring-blue-500 mb-4"
        placeholder="Type your markdown here..."
      />
      <div className="border border-gray-300 rounded-lg p-4 w-full max-w-4xl bg-white shadow-md"> {/* Increased width */}
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <ReactMarkdown
          children={inputText}
        />
      </div>
      <button
        onClick={handleExportPDF}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded text-lg"
      >
        Export to PDF
      </button>

    </div>
  );
};

export default MarkdownEditor;
