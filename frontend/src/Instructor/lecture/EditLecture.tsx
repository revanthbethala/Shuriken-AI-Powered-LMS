import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Upload, Trash2, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import { BASE_URL } from "@/data";

const EditLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { id: courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error(
        "Invalid file type. Please upload an MP4, WebM, or OGG video."
      );
      return;
    }

    if (selectedFile.size > 500 * 1024 * 1024) {
      toast.error("File size exceeds the 500MB limit.");
      return;
    }

    setVideo(selectedFile);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!courseId || !lectureId) {
      console.error("Invalid course or lecture ID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("isPreviewFree", isPreviewFree.toString());

      if (video) {
        formData.append("file", video);
      }

      const response = await axios.put(
        `${BASE_URL}/courses/${courseId}/lecture/${lectureId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
            setMediaProgress(true);
          },
        }
      );

      toast.success("Lecture updated successfully.");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to update the lecture. Please try again.");
      console.error("Upload failed", error);
    }
  };

  const removeLectureHandler = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/courses/${courseId}/lecture/${lectureId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Lecture removed successfully.");
      console.log(res);
      navigate(-1);
    } catch (error) {
      toast.error("Failed to remove lecture. Please try again.");
      console.error("Failed to remove lecture", error);
    }
  };

  // Check if the required fields are filled out
  const isFormValid = lectureTitle.trim() !== "" && video !== null;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4 md:mt-20 px-2 md:px-4">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Edit Lecture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-3 md:mb-5">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full h-8 w-8 md:h-10 md:w-10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <h1 className="font-bold text-lg md:text-xl">
              Update Your Lecture
            </h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lectureTitle" className="text-sm md:text-base">
              Lecture Title
            </Label>
            <Input
              id="lectureTitle"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              type="text"
              placeholder="Ex. Introduction to Javascript"
              className="text-sm md:text-base p-2 md:p-3"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUpload" className="text-sm md:text-base">
              Video Upload <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                id="videoUpload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="flex-1 text-sm md:text-base p-2"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {video && (
              <p className="text-xs md:text-sm text-muted-foreground break-all">
                Selected file: {video.name}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="previewFree"
              checked={isPreviewFree}
              onCheckedChange={setIsPreviewFree}
              className="scale-90 md:scale-100"
            />
            <Label htmlFor="previewFree" className="text-sm md:text-base">
              Make this video free to preview
            </Label>
          </div>

          {mediaProgress && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2 md:h-3" />
              <p className="text-xs md:text-sm text-muted-foreground">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <Separator className="my-3 md:my-4" />
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 p-4">
        <Button
          variant="outline"
          onClick={removeLectureHandler}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          <Trash2 className="h-4 w-4" />
          <span>Remove Lecture</span>
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid} // Disable the button if form is not valid
          className="w-full sm:w-auto flex items-center justify-center space-x-2 text-sm md:text-base"
        >
          <Save className="h-4 w-4" />
          <span>Update Lecture</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditLecture;
