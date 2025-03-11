import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Globe,
  Award,
} from "lucide-react";
interface Job {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_employment_type?: string;
  job_is_remote?: boolean;
  job_publisher?: string;
  job_posted_at_datetime_utc?: string;
  job_salary?: string;
  job_benefits?: string;
  job_description?: string;
  apply_options?: { publisher: string; apply_link: string }[];
  job_google_link?: string;
}
const apiKey = import.meta.env.VITE_LINKEDIN_KEY;
const JobSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  // const [jobs, setJobs] = useState<Job | []>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://jsearch.p.rapidapi.com/search",
        {
          params: {
            query: `${query} jobs in ${location}`,
            page: "1",
            num_pages: "1",
            country: "us",
            date_posted: "all",
          },
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "jsearch.p.rapidapi.com",
          },
        }
      );
      setJobs(response.data.data || []);
    } catch (error) {
      setError("Failed to fetch jobs. Try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search thousands of job listings from across the web
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-10"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Job Title or Keywords"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 px-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <motion.button
                onClick={fetchJobs}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex justify-center my-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                ease: "linear",
              }}
              className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            />
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6"
          >
            <div className="flex">
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && jobs.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No jobs found. Try adjusting your search criteria.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-2"
        >
          {jobs.map((job) => (
            <motion.div
              key={job.job_id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow "
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {job.job_title}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span className="font-medium">{job.employer_name}</span>
                      <MapPin className="h-4 w-4 ml-4 mr-2" />
                      <span>
                        {job.job_city}, {job.job_state}, {job.job_country}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.job_employment_type || "Full-time"}
                        </span>
                        {job.job_is_remote && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Remote
                          </span>
                        )}
                        {job.job_publisher && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Via {job.job_publisher}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                          <span>
                            Posted:{" "}
                            {new Date(
                              job.job_posted_at_datetime_utc
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        {job.job_salary && (
                          <div className="flex items-start">
                            <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                            <span>Salary: {job.job_salary}</span>
                          </div>
                        )}

                        {job.job_benefits && (
                          <div className="flex items-start">
                            <Award className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                            <span>Benefits: {job.job_benefits}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {job.job_description?.substring(0, 100)}...
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {job.apply_options?.length > 0 ? (
                    job.apply_options.slice(0, 3).map((option, index) => (
                      <motion.a
                        key={index}
                        href={option.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Apply via {option.publisher}
                      </motion.a>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No application options available
                    </p>
                  )}

                  <motion.a
                    href={job.job_google_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    View Details
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobSearch;
