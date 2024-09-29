import { useState } from 'react';
import JobSearch from './JobSearch.tsx';
import ContentUpload from './ContentUpload.tsx';
import MarkdownEditor from './MarkdownEditor.tsx';
import Query from './query.tsx';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'job-search' | 'content-upload' | 'query'>('dashboard');
  const [cvContent, setCvContent] = useState<string>('');
  const [animate, setAnimate] = useState(false);

  const updateCvCallback = (input: string) => {
    setCvContent(input);
  };

  const changePageCallback = (page: 'dashboard' | 'job-search' | 'content-upload' | 'query') => {
    setAnimate(true); // Trigger animation
    setCurrentPage(page);
    setTimeout(() => {
      setAnimate(false); // Reset animation after it completes
    }, 500); // Adjust this duration to match your animation duration
  };

  const basicChangePageCallback = () => {
    setCurrentPage('dashboard');
  };

  const renderContent = () => {
    const animationClass = animate ? 'animate-drop-fade' : '';

    switch (currentPage) {
      case 'job-search':
        return (
          <div className={`flex h-[75vh] ${animationClass}`}>
            <JobSearch updateCvCallback={updateCvCallback} changePageCallback={basicChangePageCallback} />
            <Query updateCvCallback={updateCvCallback} changePageCallback={basicChangePageCallback} />
          </div>
        );
      case 'content-upload':
        return (
          <div className={animationClass}>
            <ContentUpload />
          </div>
        );
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
