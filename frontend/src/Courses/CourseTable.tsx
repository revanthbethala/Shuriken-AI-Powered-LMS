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
import { useNavigate } from "react-router-dom";

// Static data for courses
const courses = [
  {
    _id: "1",
    courseTitle: "React for Beginners",
    coursePrice: "$100.00",
    isPublished: true,
  },
  {
    _id: "2",
    courseTitle: "Advanced JavaScript",
    coursePrice: "$150.00",
    isPublished: false,
  },
  {
    _id: "3",
    courseTitle: "Web Development Bootcamp",
    coursePrice: "$200.00",
    isPublished: true,
  },
  {
    _id: "4",
    courseTitle: "Introduction to Python",
    coursePrice: "$120.00",
    isPublished: false,
  },
];

const CourseTable = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3">
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
