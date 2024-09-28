import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload'>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'job-search':
        return <JobSearch />;
      case 'content-upload':
        return <ContentUpload />;
      default:
        return (
          <div className='my-10'>
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <p className="mt-4">Select a page from the navigation bar to get started.</p>
          </div>
        );
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
