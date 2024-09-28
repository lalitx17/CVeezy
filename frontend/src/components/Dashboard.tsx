import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';
import MarkdownEditor from './MarkdownEditor.tsx'

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload'>('job-search');

  const renderContent = () => {
    switch (currentPage) {
      case 'job-search':
        return <JobSearch />;
      case 'content-upload':
        return <ContentUpload />;
      default:
        return <MarkdownEditor />
    }
  };

  return (
    <div>
      <nav className="flex justify-around bg-gray-800 p-4 text-white">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="hover:underline"
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentPage('job-search')}
          className="hover:underline"
        >
          Job Search
        </button>
        <button
          onClick={() => setCurrentPage('content-upload')}
          className="hover:underline"
        >
          Content Upload
        </button>
      </nav>

      {renderContent()}
    </div>
  );
};

export default Dashboard;
