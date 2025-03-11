import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the course type
interface Course {
  _id: string;
  courseTitle: string;
  coursePrice: string;
  isPublished: boolean;
}

// Mock data to simulate API response
const mockCourses: Course[] = [
  {
    _id: "1",
    courseTitle: "Fullstack Developer",
    coursePrice: "1999",
    isPublished: true,
  },
  {
    _id: "2",
    courseTitle: "React JS Essentials",
    coursePrice: "1499",
    isPublished: false,
  },
  {
    _id: "3",
    courseTitle: "Node.js Mastery",
    coursePrice: "2999",
    isPublished: true,
  },
];

const CourseTable = () => {
  // Define state type for courses
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Mocking data fetch
  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
      setIsLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
