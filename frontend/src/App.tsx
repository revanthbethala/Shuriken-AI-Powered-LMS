import { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Loading from "./pages/Loading";
import NavBar from "./myComponents/NavBar";
import Assessments from "./pages/Assessments";
import AssessmentForm from "./Assesments/AssesmentForm";
import AssessmentInstructions from "./Assesments/AssesmentInstructions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
// import UserPreferences from "./pages/UserPreferences";
import AssessmentQuestions from "./Assesments/AssesmentQuestions";
import MockInterviewForm from "./MockInterviews/MockInterviewForm";
import MockInterviewInstructions from "./MockInterviews/MockInterviewInstructions";
import MockInterview from "./pages/MockInterview";
import MockInterviewQuestions from "./MockInterviews/MockInterviewQuestions";
import Courses from "./pages/Courses";
import CourseDetails from "./Courses/CourseDetails";
import CourseProgress from "./Courses/CourseProgress";
import Compiler from "./pages/Compiler";
import Course from "./Courses/Course";
import Jobs from "./pages/Jobs";
import JobCards from "./Jobs/JobCards";
import JobDetails from "./Jobs/JobDetails";
import ProtectedRoute from "./pages/ProtectedRoute";
// import InstructorForm from "./Instructor/InstructorForm";
import AddCourse from "./Instructor/course/AddCourse";
import EditCourse from "./Instructor/course/EditCourse";
import InstructorDashboard from "./Instructor/InstDashboard";
import RecruiterDashboard from "./Recruiter/RecruiterDashboard";
import CreateLecture from "./Instructor/lecture/CreateLecture";
import EditLecture from "./Instructor/lecture/EditLecture";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Resume from "./pages/Resume";
import InstructorInfo from "./Courses/InstructorInfo";
import CreateCompany from "./Recruiter/company/CreateCompany";
import EditCompany from "./Recruiter/company/EditCompany";
import CompanyTable from "./Recruiter/company/CompanyTable";
import JobSearch from "./Jobs/JobSearch";
import CreateJobs from "./Recruiter/company/CreateJobs";
import DSAVisualizer from "./pages/DSAVisualizer";
import ResumeLandingPage from "./Resume/ResumeLandingPage";
import ResumeAnalyzer from "./Resume/ResumeAnalyzer";
import JobForm from "./Jobs/JobForm";
import StudentDashboard from "./Courses/StudentDashboard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Courses/CheckoutForm";
import ResumeBuilder from "./Resume/ResumeBuilder";
const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
function App() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "resume",
          element: <Resume />,
          children: [
            { path: "", element: <ResumeLandingPage /> },
            {
              path: "resume-builder",
              element: <ResumeBuilder />,
            },
            {
              path: "resume-analyzer",
              element: <ResumeAnalyzer />,
            },
          ],
        },
        {
          path: "assessments",
          element: (
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <AssessmentForm />,
            },
            {
              path: "instructions",
              element: <AssessmentInstructions />,
            },
            {
              path: "start/:id",
              element: <AssessmentQuestions />,
            },
          ],
        },
        {
          path: "mockInterview",
          element: (
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <MockInterviewForm />,
            },
            {
              path: "instructions",
              element: <MockInterviewInstructions />,
            },
            {
              path: "start/",
              element: <MockInterviewQuestions />,
            },
            // {
            //   path: "results/",
            //   element: <MockInterviewResult />,
            // },
          ],
        },
        {
          path: "courses",
          element: (
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          ),
          children: [
            { path: "", element: <Course /> },
            {
              path: "course-detail/:id",
              element: <CourseDetails />,
            },
            {
              path: "checkout/:courseId",
              element: (
                <Elements stripe={stripePromise} >
                  <Checkout/>
              </Elements>
              ),
            },
            {
              path: "course-progress/:courseId",
              element: <CourseProgress />,
            },
            {
              path: ":id/instructorInfo",
              element: <InstructorInfo />,
            },
          ],
        },

        {
          path: "jobs",
          element: (
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "",
              element: <JobCards />,
            },
            {
              path: "job-detail/:jobId",
              element: <JobDetails />,
            },
            {
              path: "jobForm",
              element: <JobForm />,
            },
            {
              path: "job-search",
              element: <JobSearch />,
            },
          ],
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/compiler",
          element: (
            <ProtectedRoute>
              <Compiler />
            </ProtectedRoute>
          ),
        },
        {
          path: "instructor",
          children: [
            // {
            //   path: "",
            //   element: <InstructorForm />,
            // },
            {
              path: "dashboard",
              element: <InstructorDashboard />,
            },
            {
              path: "addCourse",
              element: <AddCourse />,
            },
            {
              path: "course/:id",
              element: <EditCourse />,
            },
            {
              path: "course/:id/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:id/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
        },
        {
          path: "recruiter",
          children: [
            {
              path: "",
              element: <CreateCompany />,
            },
            {
              path: "dashboard",
              element: <RecruiterDashboard />,
            },
            {
              path: "editCompany/:companyId",
              element: <EditCompany />,
            },
            {
              path: ":companyId/createJob",
              element: <CreateJobs />,
            },
            {
              path: "companies",
              element: <CompanyTable />,
            },
          ],
        },
      ],
    },

    {
      path: "dsa",
      element: <DSAVisualizer />,
    },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    // { path: "/user-preferences", element: <UserPreferences /> },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
