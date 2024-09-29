import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';
import MarkdownEditor from './MarkdownEditor.tsx';
import Query from './query.tsx';

const DashbosetCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload' | 'query'>('dashboard');
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl">
              {isJobSearch ? (
                <div>
                <JobSearch updateCvCallback={updateCvCallback} changePageCallback={() => changePageCallback('dashboard')} />
                </div>
              ) : (
                <div>
                <Query updateCvCallback={updateCvCallback} changePageCallback={() => changePageCallback('dashboard')} />
                </div>
              )}
            </div>
          </div>
        );
      case 'content-upload':
        return <ContentUpload />;
      default:
        return (
          <div className={animationClass}>
            <MarkdownEditor initialText={cvContent} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 animate-drop-fade">
      <header className="text-white p-6">
        <h1 className="text-center text-3xl font-bold">CV easy</h1>
      </header>

      {/* Navigation Section */}
      <nav className="p-4 border border-gray-600">
        <ul className="flex justify-around">
          <li>
            <button
              onClick={() => changePageCallback('dashboard')}
              className={`text-white py-2 px-4 hover:bg-gray-900 border border-gray-600 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-700 ${
                currentPage === 'dashboard' ? 'bg-gray-600' : ''
              }`}
            >
              Generated CV
            </button>
          </li>
          <li>
            <button
              onClick={() => changePageCallback('job-search')}
              className={`text-white py-2 px-4 hover:bg-gray-900 border border-gray-600 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-700 ${
                currentPage === 'job-search' ? 'bg-gray-600' : ''
              }`}
            >
              Job Search
            </button>
          </li>
          <li>
            <button
              onClick={() => changePageCallback('content-upload')}
              className={`text-white py-2 px-4 hover:bg-gray-900 border border-gray-600 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-700 ${
                currentPage === 'content-upload' ? 'bg-gray-600' : ''
              }`}
            >
              Content Upload
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
