import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Building2,
  Briefcase,
  TrendingUp,
  Users,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/data";
import GetUserId from "@/helperFunctions/GetUserId";
import useGet from "@/myComponents/useGet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const COLORS = ["#6366f1", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"];

interface Job {
  _id: string;
  title: string;
  description: string;
  salary: number;
  experienceLevel: number;
  location: string;
  jobtype: string;
  positions: number;
  company: string;
  applications: any[];
  createdAt: string;
}

interface Company {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  website?: string;
}

interface Applicant {
  id: string;
  name: string;
  email: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change: number;
}

const StatCard = ({ title, value, icon: Icon, change }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 rounded-lg bg-indigo-50">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {/* {change && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )} */}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

interface JobCardProps {
  job: Job;
  onGetApplicants: (id: string) => void;
  isLoading: boolean;
}

const JobCard = ({ job, onGetApplicants, isLoading }: JobCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="text-xl font-semibold">{job.title}</span>
          <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
            {job.jobtype}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <span className="font-medium">Salary:</span> ₹
            {job.salary.toLocaleString()}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Experience:</span>{" "}
            {job.experienceLevel} years
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Positions:</span> {job.positions}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Applications Received:</span>{" "}
            {job.applications?.length}
          </p>
        </div>
        {/* <Button 
          onClick={() => onGetApplicants(job._id)} 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? "Loading..." : "View Applicants"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button> */}
      </CardContent>
    </Card>
  </motion.div>
);

const RecruiterDashboard = () => {
  const userId = GetUserId();
  const {
    data: companyData,
    isLoading: companyLoading,
    error: companyError,
  } = useGet(`company/getAll/${userId}`);
  console.log(companyData);
  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useGet(`job/getAdminJobs/${userId}`);
  const [applicantsData, setApplicantsData] = useState<Applicant[] | null>(
    null
  );
  const [applicantsLoading, setApplicantsLoading] = useState<boolean>(false);
  const [applicantsError, setApplicantsError] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const companies: Company[] = companyData?.companies || [];
  const jobs: Job[] = jobsData?.jobs || [];

  const stats = useMemo(
    () => [
      {
        title: "Total Companies",
        value: companies?.length || 0,
        icon: Building2,
        change: 12,
      },
      {
        title: "Active Jobs",
        value: jobs?.length || 0,
        icon: Briefcase,
        change: 8,
      },
      {
        title: "Total Applications",
        value:
          jobs?.reduce(
            (acc, job) => acc + (job.applications?.length || 0),
            0
          ) || 0,
        icon: Users,
        change: -5,
      },
      {
        title: "Average Salary",
        value: jobs?.length
          ? `₹${Math.round(
              jobs.reduce((acc, job) => acc + job.salary, 0) / jobs.length
            ).toLocaleString()}`
          : "₹0",
        icon: TrendingUp,
        change: 15,
      },
    ],
    [companies, jobs]
  );

  const jobTypeData = useMemo(() => {
    if (!jobs?.length) return [];
    const counts = jobs.reduce((acc, job) => {
      acc[job.jobtype] = (acc[job.jobtype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  const salaryRangeData = useMemo(() => {
    if (!jobs?.length) return [];
    return jobs
      .map((job) => ({
        title: job.title,
        salary: job.salary,
      }))
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 5);
  }, [jobs]);

  const handleGetApplicants = async (jobId: string) => {
    setApplicantsLoading(true);
    setApplicantsError(null);
    setSelectedJobId(jobId);
    try {
      const res = await axios.get(
        `${BASE_URL}/application/${jobId}/applicants`
      );
      setApplicantsData(res.data?.job?.applications || []);
    } catch (error) {
      setApplicantsError("Failed to fetch applicants.");
    } finally {
      setApplicantsLoading(false);
    }
  };

  if (companyLoading || jobsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-[400px]" />
          ))}
        </div>
      </div>
    );
  }

  if (companyError || jobsError) {
    return (
      <Alert className="max-w-lg mx-auto mt-10">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Recruiter Dashboard
      </motion.h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobTypeData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Job Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {jobTypeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {salaryRangeData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Salaries</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryRangeData}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="salary" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Job Listings Section */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Job Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onGetApplicants={handleGetApplicants}
                isLoading={applicantsLoading && selectedJobId === job._id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Applicants Section */}
      <AnimatePresence>
        {applicantsData && applicantsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Applicants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicantsData.map((applicant) => (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="font-medium">{applicant.name}</p>
                      <p className="text-gray-600">{applicant.email}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {applicantsError && (
        <Alert className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{applicantsError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RecruiterDashboard;
