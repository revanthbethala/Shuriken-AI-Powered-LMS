import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/data";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureId, setLectureId] = useState<string>("");
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const createLectureHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/${courseId}/lecture`,
        JSON.stringify({ lectureTitle }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLectureId(res?.data?.lecture?._id);
      toast.success("Lecture created successfully!"); // Show success toast
    } catch (err) {
      toast.error("Failed to create the lecture. Please try again."); // Show error toast
      console.log("error", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Lecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Add some basic details for your new lecture. You can edit and expand
            on these later.
          </p>
          <div className="space-y-2">
            <Label htmlFor="lectureTitle">Lecture Title</Label>
            <Input
              id="lectureTitle"
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter the title of your lecture"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Course
          </Button>
          <Button
            onClick={createLectureHandler}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            Create Lecture
          </Button>
        </CardFooter>
      </Card>
      {lectureId && (
        <div className="fixed bottom-4 right-4 ">
          <Link
            to={`/instructor/course/${courseId}/lecture/${lectureId}`}
            className="flex items-center gap-2  text-primary-foreground px-4 py-2 rounded-md  bg-blue-700 hover:bg-blue-600 transition-colors  "
          >
            <Edit className="w-4 h-4" /> Edit Lecture
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateLecture;
