import { useState } from 'react';
import axios from 'axios';

const JobSearch: React.FC = () => {
  const [jobQuery, setJobQuery] = useState<string>('');
  const [results, setResults] = useState<Array<{ title: string; company: string }>>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/jobs?query=${jobQuery}`);
      setResults(response.data); // Assuming the response contains job results
    } catch (error) {
      console.error('Error fetching job results:', error);
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
              <li key={index} className="border-b py-2">
                {job.title} - {job.company}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
