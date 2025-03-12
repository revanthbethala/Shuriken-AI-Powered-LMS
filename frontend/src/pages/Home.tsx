import { useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
// import Spline from "@splinetool/react-spline";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Terminal,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Code,
  Briefcase,
  BookOpen,
  Database,
  LineChart,
  Cpu,
  Globe,
} from "lucide-react";

import { BASE_URL, hero, jobsImg, resume } from "../data";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Categories = () => {
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
        await axios.post(`${BASE_URL}/user/getDetails`, userData);
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
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 dark:text-white">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <motion.div
              className="space-y-6 md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Learning Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Welcome to{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Shuriken
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                Your ultimate learning and upskilling platform. Access exclusive
                content, apply for top jobs & explore certified courses taught
                by expert tutors.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="assessments"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </NavLink>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="courses"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-medium transition-colors shadow-lg shadow-slate-500/10"
                  >
                    Explore Courses
                  </NavLink>
                </motion.div>
              </div>
            </motion.div>
=
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={hero || "/placeholder.svg"}
                  alt="Hero"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-slate-800/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover By Category
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our wide range of courses and resources across different
              domains
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: "Web Development", icon: <Code className="w-5 h-5" /> },
              { name: "Data Science", icon: <Database className="w-5 h-5" /> },
              { name: "Machine Learning", icon: <Cpu className="w-5 h-5" /> },
              { name: "Business", icon: <Briefcase className="w-5 h-5" /> },
              { name: "Design", icon: <BookOpen className="w-5 h-5" /> },
              { name: "Marketing", icon: <LineChart className="w-5 h-5" /> },
              { name: "Languages", icon: <Globe className="w-5 h-5" /> },
              {
                name: "Education",
                icon: <GraduationCap className="w-5 h-5" />,
              },
            ].map((category, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ y: -5 }}>
                <NavLink to="/courses" className="block">
                  <div className="bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-700 rounded-xl p-6 h-full transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                        {category.icon}
                      </div>
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <NavLink
              to="courses"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Browse All Courses
              <ChevronRight className="ml-1 h-4 w-4" />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={jobsImg || "/placeholder.svg"}
                alt="Find jobs and internships"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>Career Opportunities</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Find your Jobs & Internships
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Discover top jobs and internships tailored for students and
                professionals in India. Boost your career with AI-powered resume
                analysis, mock interviews, and skill tests.
              </p>
              <ul className="space-y-3">
                {[
                  "AI-powered job matching",
                  "Mock interviews",
                  "Skill assessments",
                  "Direct applications",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="jobs"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Apply for Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-blue-900/20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We provide comprehensive tools and resources to help you succeed
              in your learning journey
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
                title: "Assessments & Courses",
                description:
                  "Unlock your potential with personalized assessments and expert-led courses. Identify strengths, growth areas, and enhance your skills.",
                link: { to: "courses", text: "View Courses" },
              },
              {
                icon: <FileText className="h-8 w-8 text-purple-500" />,
                title: "Mock Interviews & Jobs",
                description:
                  "Our platform offers comprehensive Jobs & Mock Interviews to help you advance in your career. Browse curated job listings across various industries.",
                link: { to: "resume/resume-builder", text: "Build Resume" },
              },
              {
                icon: <Terminal className="h-8 w-8 text-emerald-500" />,
                title: "Compiler",
                description:
                  "Practice coding and run your programs directly on our online compiler. Test, debug, and optimize your code in various programming languages.",
                link: { to: "compiler", text: "Try Compiler" },
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col h-full"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                  {feature.description}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto"
                >
                  <NavLink
                    to={feature.link.to}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-sm"
                  >
                    {feature.link.text}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </NavLink>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Build Your Resume with AI
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Our <strong>AI-Powered Resume Builder</strong> helps you create
                professional, ATS-friendly resumes effortlessly. Simply enter
                your details, and AI will generate a polished resume with
                optimized formatting.
              </p>
              <ul className="space-y-3">
                {[
                  "ATS-friendly templates",
                  "Industry-specific suggestions",
                  "Instant formatting",
                  "Expert tips",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-2 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="resume/resume-builder"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg shadow-purple-500/20"
                >
                  Build Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NavLink>
              </motion.div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={resume || "/placeholder.svg"}
                alt="Resume builder"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-6">Shuriken</h3>
              <p className="text-slate-300 mb-6">
                Your ultimate learning and upskilling platform. Access exclusive
                content, apply for top jobs & explore certified courses.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Courses", "Tests", "Jobs", "Compiler"].map(
                  (link, i) => (
                    <li key={i}>
                      <NavLink
                        to={`/${link.toLowerCase()}`}
                        className="text-slate-300 hover:text-white transition-colors"
                      >
                        {link}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                {[
                  "Blog",
                  "Documentation",
                  "Community",
                  "Help Center",
                  "FAQ",
                ].map((link, i) => (
                  <li key={i}>
                    <NavLink
                      to={`/${link.toLowerCase()}`}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <ul className="space-y-3 text-slate-300">
                <li>Email: support@shuriken.com</li>
                <li>Phone: +123-456-7890</li>
                <li>Address: 1234 Learning St., EduCity</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Shuriken. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Categories;
