import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';
import MarkdownEditor from './MarkdownEditor.tsx';
import Query from './query.tsx';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload'| "query">('dashboard');


  const renderContent = () => {
    switch (currentPage) {
      case 'job-search':
        return <JobSearch />;
      case 'content-upload':
        return <ContentUpload />;
      case 'query':
        return <Query/>;
      default:
        return <MarkdownEditor />;
    }
  };

  
  return (
    <div>
      <h1 className="bg-gray-600 text-white text-lg font-bold">CV generator</h1>
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
        <button
          onClick={() => setCurrentPage('query')}
          className="hover:underline"
        >
          query
        </button>
      </nav>

      {renderContent()}
    </div>
  );
};

export default Dashboard;
