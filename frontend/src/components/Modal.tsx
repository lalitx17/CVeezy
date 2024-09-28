import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    title: string;
    company: string;
    description: string;
    requirements: string;
  }; // Add more fields as necessary
  onGenerateCV: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, job, onGenerateCV }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-hidden">
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <h3 className="text-lg mb-2">{job.company}</h3>
        
        {/* Scrollable area for job description */}
        <div className="overflow-y-auto max-h-[60vh] mb-4"> 
          <ReactMarkdown>{job.description}</ReactMarkdown>
        </div>
        
        <p className="mb-4"><strong>Requirements:</strong> {job.requirements}</p>
        
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={onGenerateCV}>
            Generate CV
          </button>
          <button className="bg-gray-300 text-black py-2 px-4 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
