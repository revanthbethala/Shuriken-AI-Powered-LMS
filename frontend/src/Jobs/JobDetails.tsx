import { NavLink, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  DollarSign,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGet from "@/myComponents/useGet";
import Loading from "@/pages/Loading";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { BASE_URL } from "@/data";

const JobDetails = () => {
  const [jobStatus, setJobStatus] = useState<string | undefined | null>("");
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { data, isLoading, error } = useGet(`job/get/${jobId}`);
  const { user } = useUser();
  if (isLoading) return <Loading />;
  if (error || !data)
    return (
      <div className="flex items-center justify-center h-screen ">
        <p className="text-center text-red-500 font-medium text-lg p-6 rounded-lg shadow-lg">
          Error loading job details.
        </p>
      </div>
    );
  const job = data.job;
  const PostApplication = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/application/apply/${job._id}`,
        JSON.stringify({ userId: user?.id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setJobStatus(res?.data?.message);
      console.log(res);
    } catch (err) {
      console.log("error", err);
      setJobStatus(err?.response?.data?.message);

    }
  };
  return (
    <div className="min-h-screen ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100"
        >
          <ArrowLeft size={18} /> Back to Jobs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8 space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
                  {job.title}
                </h1>
              </div>
              <Badge className="text-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600">
                {job.jobtype}
              </Badge>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {job.description}
            </p>

            <div className="grid grid-cols-2 gap-6 text-gray-700">
              <div className="flex items-center gap-3">
                <MapPin size={24} />
                <span className="capitalize text-lg">{job.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase size={24} />
                <span className="text-lg">
                  {job.experienceLevel} years experience
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={24} />
                <span className="text-lg">{job.positions} open positions</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={24} />
                <span className="text-lg">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign size={24} />
                <span className="text-lg">₹{job.salary.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                Requirements
              </h3>
              <ul className="space-y-2">
                {job?.requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-xl p-8 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              Apply for this position
            </h3>
            <p className="text-gray-600">
              Ready to take the next step in your career? Apply now and join our
              team of professionals!
            </p>
            <NavLink to="/jobs/jobForm">
            <Button className="w-full text-lg py-6">
              Apply Now
            </Button>
            </NavLink>
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Job Summary
              </h4>
              <ul className="space-y-2 text-gray-600 list-disc">
                <li> Competitive salary</li>
                <li> Health insurance</li>
                <li> Professional development opportunities</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;
