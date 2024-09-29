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
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/jobs?q=${jobQuery}`
      );
      setResults(response.data); // Assuming the response contains job results
    } catch (error) {
      console.error("Error fetching job results:", error);
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
      console.log('CV generated:', response.data);
      updateCvCallback(response.data.choices[0].message.content);
      changePageCallback();
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="w-1/2 p-4 bg-gray-800 text-white">
      <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={jobQuery}
          onChange={(e) => setJobQuery(e.target.value)}
          className="border border-gray-600 rounded px-3 py-2 mb-4 w-full bg-gray-700 text-white focus:ring focus:ring-blue-500"
          placeholder="Search for jobs"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-lg"
        >
          Search
        </button>
      </form>
      {results.length > 0 && (
        <div className="mt-6">
          <ul className="mt-4 space-y-4">
            {results.map((job, index) => (
              <li
                key={index}
                className="border border-gray-600 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-gray-700"
                onClick={() => handleJobClick(job)}
              >
                <h4 className="font-bold text-lg">{job.job_title}</h4>
                <p className="text-gray-300">{job.company}</p>
                <p className="text-gray-400 mt-2 text-sm line-clamp-3">
                  {job.description.length > 300 ? `${job.description.substring(0, 300)}...` : job.description}
                </p>
                <p className="text-gray-400 mt-2 text-sm">Salary: ${job.min_annual_salary}</p>
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
        loading={loading}
      />
    </div>
  );
};

export default JobSearch;
