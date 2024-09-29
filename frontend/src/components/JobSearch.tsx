import { useState } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import the Modal component
import { useAuth } from "./useAuth.tsx";

interface JobSearchProps {
  updateCvCallback: (cvContent: string) => void;
  changePageCallback: () => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ updateCvCallback, changePageCallback }) => {
  const { userId } = useAuth();
  const [jobQuery, setJobQuery] = useState<string>("");
  const [results, setResults] = useState<
    Array<{
      job_title: string;
      company: string;
      description: string;
      requirements: string;
      min_annual_salary: number;
    }>
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/jobs`,
        {
          q: jobQuery
        }
      );
      setResults(response.data.data); // Assuming the response contains job results
    } catch (error) {
      console.error("Error fetching job results:", error);
    } finally {
      setLoading(false);
    }
  };

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleGenerateCV = async () => {
    setLoading(true); // Start loading when request starts
    try {
      const response = await axios.post('http://localhost:3000/generate-cv', {
        content: selectedJob.description,
        userId: userId,
        company: selectedJob.company,
        resultType: "COVER_LETTER",
        title: selectedJob.job_title,
      });
      updateCvCallback(response.data.choices[0].message.content);
      changePageCallback();
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Job Search</h2>
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              value={jobQuery}
              onChange={(e) => setJobQuery(e.target.value)}
              className="flex-grow px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Search for jobs"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        )}
        {results.length > 0 && (
          <ul className="space-y-6">
            {results.map((job, index) => (
              <li
                key={index}
                className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handleJobClick(job)}
              >
                <h4 className="font-bold text-xl text-blue-400 mb-2">{job.job_title}</h4>
                <p className="text-gray-300 mb-3">{job.company}</p>
                <p className="text-gray-400 mb-4 line-clamp-3">{job.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-400 font-semibold">Salary: ${job.min_annual_salary.toLocaleString()}</span>
                  <span className="text-blue-400 hover:underline">View Details</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onGenerateCV={handleGenerateCV}
        loading={loading}
      />
    </div>
  );
};

export default JobSearch;
