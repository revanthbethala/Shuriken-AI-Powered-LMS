import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetUserId from "@/helperFunctions/GetUserId";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { BASE_URL } from "@/data";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const getSelectedCategory = (value: string) => {
    setCategory(value);
  };

  const userId = GetUserId();
  const courseData = {
    userId,
    courseTitle,
    category,
  };
  console.log(courseData);

  const createCourseHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/create`,
        JSON.stringify(courseData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const id = res?.data?.course?._id;
      console.log(id);
      toast.success("Course created successfully!");
      navigate(`/instructor/course/${id}`);
    } catch (err) {
      console.log("error", err);
      toast.error("Failed to create course");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen p-6 "
    >
      <div className="mb-6 text-center">
        <h1 className="font-bold text-3xl text-gray-800 mb-3">
          Add a New Course
        </h1>
        <p className="text-lg text-gray-600">
          Provide some basic details for your new course
        </p>
      </div>
      <div className="space-y-6 w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-2 border-blue-300">
        <div>
          <Label
            htmlFor="courseTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </Label>
          <Input
            id="courseTitle"
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter your course name"
            className="mt-1 block w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <div>
          <Label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
            className="w-32 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-all"
          >
            Back
          </Button>
          <Button
            onClick={createCourseHandler}
            className="w-32 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all"
          >
            Create
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddCourse;
