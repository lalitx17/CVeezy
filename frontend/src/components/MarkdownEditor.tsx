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
      const response = await axios.post(
        'http://localhost:3000/export-pdf',
        { inputText },
        { responseType: 'blob' }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(blob);

        window.open(blobUrl);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF.');
    }
  };

  return (
    <div className="flex flex-col w-full h-[70vh] text-white">
      <h2 className="text-2xl font-bold text-center my-4">Generated Cover Letter</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="flex-grow border border-gray-600 rounded-lg px-4 py-3 w-full resize-none focus:ring focus:ring-blue-500 bg-gray-700 text-white"
        placeholder="Cover Letter text will be displayed here..."
      />
      <div className="p-4">
        <button
          onClick={handleExportPDF}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition-colors duration-200"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
