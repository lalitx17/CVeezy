import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';
import MarkdownEditor from './MarkdownEditor.tsx';
import Query from './query.tsx';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload'| 'query'>('dashboard');
  const [cvContent, setCvContent] = useState<string>('');

  const updateCvCallback = (input: string) => {
    setCvContent(input);
  };

  const changePageCallback = () => {
    setCurrentPage('dashboard');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'job-search':
        return ( <div className="flex h-screen">
      <JobSearch updateCvCallback={updateCvCallback} changePageCallback={changePageCallback} />
      <Query updateCvCallback={updateCvCallback} changePageCallback={changePageCallback} />
    </div>        )
      case 'content-upload':
        return <ContentUpload />;
      default:
        return <MarkdownEditor initialText={cvContent} />;
    }
  };

  return (
    <div>
      <h1 className="bg-gray-600 text-white text-lg font-bold">CV generator</h1>

      {/* Navigation Section */}
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-around">
          <li>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`text-white py-2 px-4 hover:bg-gray-600 rounded ${
                currentPage === 'dashboard' ? 'bg-gray-600' : ''
              }`}
            >
              Generated CV
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('job-search')}
              className={`text-white py-2 px-4 hover:bg-gray-600 rounded ${
                currentPage === 'job-search' ? 'bg-gray-600' : ''
              }`}
            >
              Job Search
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage('content-upload')}
              className={`text-white py-2 px-4 hover:bg-gray-600 rounded ${
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
  </div> )
};

export default Dashboard;
