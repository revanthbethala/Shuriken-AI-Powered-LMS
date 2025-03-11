import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const {id} = useParams()
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add detailed information regarding the course
        </h1>
        <Link to={`/instructor/course/${id}/lecture`}>
          <Button className="text-blue-600 hover:text-blue-800" variant="link">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
