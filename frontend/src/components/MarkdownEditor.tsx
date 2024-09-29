import React, { useState } from 'react';
import axios from 'axios';

const MarkdownEditor: React.FC = ({ initialText }) => {
  const [inputText, setInputText] = useState(initialText);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.post('http://localhost:3000/export-pdf', {
        inputText,
      }, {responseType: "blob"});

      if (response.status === 200) {
        console.log(response.data.message);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);

        window.open(blobUrl);
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
