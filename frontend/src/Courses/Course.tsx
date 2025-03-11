import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGet from "@/myComponents/useGet";
import { Search } from "lucide-react";
import Loading from "@/pages/Loading";

interface Course {
  _id: string;
  category: string;
  courseLevel: string;
  coursePrice: number;
  courseThumbnail: string;
  courseTitle: string;
  createdAt: string;
  creator: { name?: string; photoUrl?: string };
  description: string;
  enrolledStudents: number[];
  isPublished: boolean;
  lectures: string[];
  subTitle: string;
  updatedAt: string;
}

interface CourseCardProps {
  course: Course;
}
const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer"
    >
      <Link to={`course-detail/${course._id}`}>
        <Card className="bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-44 object-cover rounded-t-2xl"
            />
            <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <CardContent className="px-5 py-4 space-y-4">
            <h2 className="font-semibold text-lg truncate hover:underline capitalize">
              {course.courseTitle}
            </h2>
            <p className="text-sm text-gray-700 line-clamp-1">
              {stripHtml(course.description)}
            </p>
            {/* <div className="flex justify-between items-center text-sm text-gray-500">
              <p>{course.enrolledStudents?.length} students enrolled</p>
            </div> */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">
                ₹{course.coursePrice}
              </span>
              <p className="text-xs text-gray-400">
                Published: {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const Course = () => {
  const { data, isLoading, error } = useGet("courses/published");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCourses = data?.courses?.filter((course: Course) =>
    course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 px-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Our Courses
        </h2>
        <p className="text-gray-600 mt-2">
          Find the perfect course to boost your career
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md mx-auto mt-6"
        >
          <input
            type="text"
            placeholder="Search for a course..."
            className="w-full px-5 py-3 pl-12 text-gray-800 border border-gray-300 rounded-full shadow-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </motion.div>
      </motion.div>
      {isLoading && <Loading />}
      {error && (
        <p className="text-center text-red-500 font-medium text-lg">
          Error loading courses.
        </p>
      )}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCourses?.length > 0 &&
          filteredCourses.map((course: Course) => (
            <CourseCard key={course._id} course={course} />
          ))}
      </motion.div>
    </div>
  );
};

export default Course;
