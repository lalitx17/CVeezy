import React, { useState } from 'react';
import JobSearch from './JobSearch';
import ContentUpload from './ContentUpload';
import MarkdownEditor from './MarkdownEditor';
import Navbar from './Navbar';
import Query from './query';

const ToggleSwitch = ({ isJobSearch, onToggle }: { isJobSearch: boolean, onToggle: () => void }) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <span className={`mr-3 text-lg ${isJobSearch ? 'font-bold text-white' : 'text-gray-500'}`}>Job Search</span>
      <div
        className="w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
        onClick={onToggle}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
            isJobSearch ? 'translate-x-0 bg-blue-500' : 'translate-x-7 bg-gray-500'
          }`}
        />
      </div>
      <span className={`ml-3 text-lg ${!isJobSearch ? 'font-bold text-white' : 'text-gray-400'}`}>Query</span>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload'>('job-search');
  const [cvContent, setCvContent] = useState<string>('');
  const [isJobSearch, setIsJobSearch] = useState(true);

  const updateCvCallback = (input: string) => {
    setCvContent(input);
  };

  const changePageCallback = (page: 'dashboard' | 'job-search' | 'content-upload') => {
    setCurrentPage(page);
  };

  const toggleJobSearchView = () => {
    setIsJobSearch(!isJobSearch);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'job-search':
        return (
          <div className="space-y-6 flex items-center flex-col">
            <ToggleSwitch isJobSearch={isJobSearch} onToggle={toggleJobSearchView} />
            <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6">
              {isJobSearch ? (
                <JobSearch updateCvCallback={updateCvCallback} changePageCallback={() => changePageCallback('dashboard')} />
              ) : (
                <Query updateCvCallback={updateCvCallback} changePageCallback={() => changePageCallback('dashboard')} />
              )}
            </div>
          </div>
        );
      case 'content-upload':
        return <ContentUpload />;
      default:
        return <MarkdownEditor initialText={cvContent} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar onNavigate={changePageCallback} />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {currentPage === 'dashboard' ? 'Generated CV' : currentPage === 'job-search' ? 'Job Search' : 'Content Upload'}
        </h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
