import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { BASE_URL } from "@/data";
import RichTextEditor from "@/myComponents/RichTextEditor";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CourseInput {
  courseTitle: string;
  subTitle: string;
  description: string;
  category: string;
  courseLevel: string;
  coursePrice: string;
  courseThumbnail: File | string;
  isPublished: boolean;
}

const CourseTab = () => {
  const [input, setInput] = useState<CourseInput>({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    isPublished: false,
  });

  const params = useParams();
  const courseId = params.id as string;
  const [previewThumbnail, setPreviewThumbnail] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Change input handler
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const selectCategory = (value: string) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  // Handle course level selection
  const selectCourseLevel = (value: string) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  // Handle thumbnail selection
  const selectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () =>
        setPreviewThumbnail(fileReader.result as string);
      fileReader.readAsDataURL(file);
    }
  };

  // Toggle Publish Status
  const togglePublishStatus = () => {
    setInput((prev) => ({ ...prev, isPublished: !prev.isPublished }));
  };

  // Update Course
  const updateCourseHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);
      formData.append("isPublished", String(input.isPublished)); // Convert boolean to string
      if (input.courseThumbnail instanceof File) {
        formData.append("courseThumbnail", input.courseThumbnail);
      }
      setIsLoading(true);
      const res = await axios.put(
        `${BASE_URL}/courses/edit/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Course updated:", res.data);
      toast.success("Course updated successfully!");
    } catch (err) {
      toast.error("Error updating course");
      console.error("Error updating course:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const isFormComplete = () => {
    return (
      input.courseTitle.trim() !== "" &&
      input.subTitle.trim() !== "" &&
      input.description.trim() !== "" &&
      input.category.trim() !== "" &&
      input.courseLevel.trim() !== "" &&
      input.coursePrice.trim() !== "" &&
      (input.courseThumbnail instanceof File ||
        typeof input.courseThumbnail === "string")
    );
  };

  return (
    <Card className="shadow-lg rounded-lg p-6 bg-white border border-gray-200">
      <CardContent className="mt-6 space-y-6">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack developer"
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack developer from zero to hero"
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Category</Label>
            <Select value={input.category} onValueChange={selectCategory}>
              <SelectTrigger>
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
          <div>
            <Label>Course Level</Label>
            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Levels</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label>Price in INR</Label>
          <Input
            type="number"
            name="coursePrice"
            value={input.coursePrice}
            onChange={changeEventHandler}
            placeholder="Ex. 199"
          />
        </div>
        <div>
          <Label>Course Thumbnail</Label>
          <Input type="file" onChange={selectThumbnail} accept="image/*" />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="mt-2 max-w-[200px] rounded-md"
              alt="Course Thumbnail"
            />
          )}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={togglePublishStatus}
            disabled={!isFormComplete()}
            className={`px-4 py-2 rounded-md border ${
              isFormComplete()
                ? "border-blue-500 hover:bg-blue-50"
                : "border-gray-300 cursor-not-allowed opacity-50"
            } focus:ring-2 focus:ring-blue-400`}
            title={
              !isFormComplete()
                ? "Please fill all fields before publishing"
                : ""
            }
          >
            {input.isPublished ? "Unpublish Course" : "Publish Course"}
          </Button>
        </div>
        <div className="flex gap-4 mt-6">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={updateCourseHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default CourseTab;
