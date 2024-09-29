import React, { useState } from 'react';
import axios from 'axios';

interface MarkdownEditorProps {
  initialText: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialText }) => {
  const [inputText, setInputText] = useState(initialText);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleExportPDF = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.post(
        'http://localhost:3000/export-pdf',
        { inputText },
        { responseType: 'blob' }
      );
=======
      const response = await axios.post('/export-pdf', { inputText }, { responseType: 'blob' });
>>>>>>> a7e88ad (ui changed)

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);
        window.open(blobUrl);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto space-y-6 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
        Generated Cover Letter
      </h2>
      <div className="relative flex-grow">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="w-full h-[60vh] p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-inner resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          placeholder="Your cover letter will appear here..."
        />
        <div className="absolute bottom-4 right-4 text-gray-400 text-sm">
          {inputText.length} characters
        </div>
      </div>
      <button
        onClick={handleExportPDF}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default MarkdownEditor;
