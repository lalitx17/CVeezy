import { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import { useAuth } from "./useAuth.tsx"

const JobSearch: React.FC = ({ updateCvCallback, changePageCallback }) => {
  const { userId } = useAuth();
  const [jobQuery, setJobQuery] = useState<string>('');
  const [results, setResults] = useState<Array<{ title: string; company: string; description: string; requirements: string }>>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/jobs?q=${jobQuery}`);
      setResults(response.data); // Assuming the response contains job results
    } catch (error) {
      console.error('Error fetching job results:', error);
    }
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleGenerateCV = async () => {
    try {
      console.log(userId)
      const response = await axios.post('http://localhost:3000/generate-cv', { content: selectedJob.description, userId: userId });
      console.log('CV generated:', response.data);
      updateCvCallback(response.data.choices[0].message.content);
      changePageCallback();
    } catch (error) {
      console.error('Error generating CV:', error);
    }
  };

  return (
    <div className='my-10'>
      <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={jobQuery}
          onChange={(e) => setJobQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          placeholder="Search for jobs"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
        >
          Search
        </button>
      </form>
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Job Results:</h3>
          <ul className="mt-2">
            {results.map((job, index) => (
              <li key={index} className="border-b py-2 cursor-pointer" onClick={() => handleJobClick(job)}>
                {job.title} - {job.company}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onGenerateCV={handleGenerateCV}
      />
    </div>
  );
};

export default JobSearch;
