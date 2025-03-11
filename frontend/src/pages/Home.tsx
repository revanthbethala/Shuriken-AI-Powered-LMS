import {
  ArrowRightIcon,
  CheckCircle,
  FileText,
  Terminal,
  Twitter,
  Linkedin,
  Github,
  FacebookIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import { BASE_URL, categories, hero, jobsImg, resume } from "../data";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import Spline from '@splinetool/react-spline';
import axios from "axios";
function Categories() {
  const { user, isLoaded } = useUser();
  const syncUserData = async () => {
    if (user) {
      try {
        const userData = {
          userId: user.id,
          fullName: user.username,
          email: user.primaryEmailAddress?.emailAddress,
          profilePic: user.imageUrl,
          isSignedIn: true,
        };
        await axios.post(
          `${BASE_URL}/user/getDetails`,
          userData
        );
      } catch (error) {
        console.error("Error syncing user data:", error);
      }
    }
  };
  useEffect(() => {
    if (isLoaded && user) {
      syncUserData();
    }
  }, [isLoaded, user]);
  return (
    <div className=" w-full ">
      {/* Hero Section */}
      <div className="flex md:flex-row flex-col-reverse md:px-20 items-center h-[calc(100vh-5rem)] justify-between px-2">
        <div className="space-y-4 p-4 flex flex-col  md:items-start font-Inter md:w-1/2">
          <h3 className="font-bold text-3xl md:text-4xl tracking-wide text-start  ">
            Welcome to <span className="text-blue-600">Shuriken</span>
          </h3>
          <p className="font-semibold tracking-wide text-base md:text-xl leading-relaxed  md:text-start  ">
            Your ultimate learning and up skilling platform.Access exclusive
            content,apply for top jobs & Explore certified courses taught by
            expert tutors. Enhance your skills with tests,mock interviews and a
            powerful compiler
          </p>
          <NavLink
            to="assessments"
            className="rounded-lg cursor-pointer w-fit text-white bg-blue-600 p-2 text-base font-semibold flex justify-center items-center gap-2"
          >
            Get Started
            <ArrowRightIcon size={15} className="font-bold" />
          </NavLink>
        </div>
        <div>
          <img src={hero} alt="Hero" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex flex-col py-10 px-4">
        <h3 className=" text-3xl md:text-4xl text-center font-bold font-Inter tracking-wide">
          Discover By Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 font-Inter pt-10 gap-6">
          {categories.map((category, index) => (
            <NavLink
              to="/courses"
              key={index}
              className="flex items-center justify-center px-4 py-5"
            >
              <button className="md:text-lg text-base flex flex-row justify-center items-center gap-2 font-semibold font-poppins bg-blue-500 text-white p-4 rounded-xl cursor-pointer">
                <span>{category.icon}</span>
                {category.name}
              </button>
            </NavLink>
          ))}
        </div>
        <NavLink
          to="courses"
          className="cursor-pointer text-blue-700 hover:underline-offset-2 hover:underline text-xl font-bold mt-6 font-Inter flex justify-center items-center gap-2"
        >
          Browse All
          <ArrowRightIcon size={15} className="font-bold" />
        </NavLink>
      </div>
      <div className="flex md:flex-row flex-col justify-evenly md:px-20 p-4 items-center md:gap-36 gap-5">
        <div>
          <img src={jobsImg} alt="jobs" className="w-full max-w-md" />
        </div>
        <div className="space-y-4 p-4 flex flex-col gap-2 font-Inter  md:w-1/2">
          <h3 className="font-bold text-2xl md:text-3xl tracking-wide ">
            Find your Jobs & Internships
          </h3>
          <p className="font-medium tracking-wide text-sm md:text-lg leading-relaxed ">
            Discover top jobs and internships tailored for students and
            professionals in India. Boost your career with AI-powered resume
            analysis, mock interviews, and skill tests. Apply seamlessly and
            unlock new opportunities with curated job listings.
          </p>
          <NavLink
            to="jobs"
            className="rounded-lg cursor-pointer w-fit text-white bg-blue-600 p-2 text-base font-semibold flex justify-center items-center gap-2"
          >
            Apply for Jobs
          </NavLink>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <div className="px-4 md:px-8 flex justify-center flex-col items-center">
        <h3 className="md:text-4xl text-3xl text-center font-bold font-Inter tracking-wide m-8">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-10">
          {/* Assessments & Courses */}
          <div className="card-style">
            <CheckCircle size={40} />
            <h3 className="text-center font-bold text-2xl">
              Assessments & Courses
            </h3>
            <p className="text-justify md:text-base text-sm ">
              Unlock your potential with personalized assessments and expert-led
              courses. Identify strengths, growth areas, and enhance your
              skills. Explore courses designed to advance your career and open
              new opportunities. Start your journey toward success today!
            </p>
            <NavLink
              to="courses"
              className="font-semibold bg-blue-600 text-white w-fit p-2 rounded-lg"
            >
              View Courses
            </NavLink>
          </div>

          {/* Resume Builder & Jobs */}
          <div className="card-style">
            <FileText size={40} />
            <h3 className="text-center font-bold text-2xl">
              Mock Interviews & Jobs
            </h3>
            <p className="text-justify md:text-base text-sm">
              Our platform offers a comprehensive Jobs & Mock Interviews feature
              to help you advance in your career. Browse curated job listings
              across various industries, apply with ease, and stay updated on
              the latest opportunities.
            </p>
            <NavLink
              to="resume-builder"
              className="font-semibold bg-blue-600 text-white w-fit p-2 rounded-lg"
            >
              Build Resume
            </NavLink>
          </div>

          {/* Compiler */}
          <div className="card-style">
            <Terminal size={40} />
            <h3 className="text-center font-bold text-2xl">Compiler</h3>
            <p className="text-justify md:text-base text-sm">
              Practice coding and run your programs directly on our online
              compiler. Test, debug, and optimize your code in various
              programming languages, all within a user-friendly environment.
              Enhance your coding skills today!
            </p>
            <NavLink
              to="compiler"
              className="font-semibold bg-blue-600 text-white w-fit p-2 rounded-lg"
            >
              Try Compiler
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-evenly md:px-20 p-4 items-center md:gap-36 gap-5">
        <div>
          <img src={resume} alt="resume_img" className="w-full max-w-md" />
        </div>
        <div className="space-y-4 p-4 flex flex-col gap-2 font-Inter  md:w-1/2">
          <h3 className="font-bold text-2xl md:text-3xl tracking-wide ">
            Build Your Resume with AI
          </h3>
          <p className="font-medium tracking-wide text-sm md:text-lg leading-relaxed ">
            Our <strong>AI-Powered Resume Builder</strong> helps you create
            professional, ATS-friendly resumes effortlessly. Simply enter your
            details, and AI will generate a polished resume with optimized
            formatting and key industry-specific suggestions. Stand out to
            recruiters with a well-structured and impactful resume in minutes!
          </p>
          <NavLink
            to="resume-builder"
            className="rounded-lg cursor-pointer w-fit text-white bg-blue-600 p-2 text-base font-semibold flex justify-center items-center gap-2"
          >
            Build Resume
          </NavLink>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-tr from-blue-600  to-blue-700 mt-10 text-white py-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <h4 className="font-semibold text-xl">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/courses" className="hover:underline">
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tests" className="hover:underline">
                    Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/courses" className="hover:underline">
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/jobs" className="hover:underline">
                    Jobs
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-xl">Follow Us</h4>
              <div className="flex space-x-4">
                <NavLink to="https://facebook.com" target="_blank">
                  <FacebookIcon size={24} />
                </NavLink>
                <NavLink to="https://twitter.com" target="_blank">
                  <Twitter size={24} />
                </NavLink>
                <NavLink to="https://linkedin.com" target="_blank">
                  <Linkedin size={24} />
                </NavLink>
                <NavLink to="https://github.com" target="_blank">
                  <Github size={24} />
                </NavLink>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4 text-white">
              <h4 className="font-semibold text-xl">Contact Info</h4>
              <p className="">Email: support@shuriken.com</p>
              <p className="">Phone: +123-456-7890</p>
              <p className="">Address: 1234 Learning St., EduCity</p>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Shuriken. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Categories;
