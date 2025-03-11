"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGet from "@/myComponents/useGet";
import { Briefcase, MapPin, DollarSign, Newspaper, Search } from "lucide-react";
import { NavLink } from "react-router";

interface Job {
  _id: string;
  title: string;
  description: string;
  salary: number;
  location: string;
  positions: number;
  requirements: string[];
  applications: string[];
}

const JobCards = () => {
  const { data, isLoading, error } = useGet("job/get");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const jobsData = data?.jobs;
  console.log(jobsData);
  useEffect(() => {
    if (!isLoading && !error) {
      setFilteredJobs(
        jobsData?.filter((job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, jobsData, error, isLoading]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-500 font-medium text-lg mb-2">
            Error fetching jobs!
          </p>
          <p className="text-gray-600">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-3 py-8">
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border-gray-300 focus:ring-primary focus:border-primary rounded-full"
          />
        </div>
      </div>

      {filteredJobs?.length === 0 && !isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-gray-500 text-lg">
            No jobs found matching "{searchTerm}"
          </p>
          {searchTerm && (
            <>
              <div className="text-lg p-2 font-Inter">
                Wanna Search from other sources?
                <NavLink
                  to="/jobs/job-search"
                  className="text-blue-600 underline"
                >
                  Try Here
                </NavLink>
              </div>
            </>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredJobs?.map((job) => (
              <motion.div
                key={job._id}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 capitalize">
                    <Briefcase size={20} className="text-primary" /> {job.title}
                  </h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {job.positions} open
                  </span>
                </div>
                <p className="text-gray-600 my-2 line-clamp-2">
                  {job.description[0].toUpperCase() + job.description.slice(1)}
                </p>
                <div className="mt-4 space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin
                      size={16}
                      className="text-green-500 flex-shrink-0"
                    />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign
                      size={16}
                      className="text-amber-500 flex-shrink-0"
                    />
                    <span>₹{job.salary.toLocaleString()} / month</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Newspaper
                      size={16}
                      className="text-blue-500 flex-shrink-0"
                    />
                    <span>{job.applications.length} applications received</span>
                  </div>
                </div>
                <NavLink to={`job-detail/${job._id}`}>
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-500">
                    View Details
                  </Button>
                </NavLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default JobCards;
