import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/data";
import { useInterviewStore } from "@/store/useInterviewStore";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { WebcamIcon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import Webcam from "react-webcam";

function MockInterviewInstructions() {
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const { formData } = useInterviewStore();
  const {
    interviewType,
    role: jobRole,
    experience,
    numberOfQuestions: noOfQuestions,
  } = formData;
  const { user } = useUser();
  const userId = user?.id;

  // const navigate = useNavigate();
  const [mockId, setMockId] = useState("");

  const sendData = {
    userId,
    jobRole,
    interviewType,
    experience,
    noOfQuestions,
  };

  async function PostMockDetails() {
    try {
      const res = await axios.post(
        `${BASE_URL}/mock/mock-tests`,
        JSON.stringify(sendData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Form Submitted:", res?.data);
      const id = res?.data?.mock?._id;
      setMockId(id);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center p-6 bg-gray-100">
      {/* Instructions Section */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-6">
        <h2 className="font-extrabold text-center text-3xl tracking-wide text-gray-800">
          Mock Interview Instructions
        </h2>
        <div className="space-y-4">
          <h3 className="text-lg">
            <span className="font-semibold text-gray-700">
              Interview Type:{" "}
            </span>
            {interviewType}
          </h3>
          <h3 className="text-lg">
            <span className="font-semibold text-gray-700">Job Role: </span>
            {jobRole}
          </h3>
          <h3 className="text-lg">
            <span className="font-semibold text-gray-700">
              Experience Level:{" "}
            </span>
            {experience}
          </h3>
          <h3 className="text-lg">
            <span className="font-semibold text-gray-700">
              Number of Questions:{" "}
            </span>
            {noOfQuestions}
          </h3>
        </div>

        <p className="text-gray-600 text-center">
          Ensure your camera and microphone are enabled before proceeding.
        </p>

        {isAllowed && (
          <NavLink to={`/mockInterview/start/`}>
            <Button
              onClick={PostMockDetails}
              variant="default"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white text-lg font-medium py-3 rounded-lg transition duration-200"
            >
              Start Interview
            </Button>
          </NavLink>
        )}
      </div>

      {/* Webcam Section */}
      <div className="flex flex-col items-center gap-6 mt-6 md:mt-0 md:ml-10">
        {isAllowed ? (
          <Webcam
            onUserMedia={() => setIsAllowed(true)}
            onUserMediaError={() => setIsAllowed(false)}
            className="w-full max-w-xs h-auto rounded-xl shadow-lg border border-gray-300"
          />
        ) : (
          <WebcamIcon size={150} className="text-gray-500" />
        )}

        {!isAllowed && (
          <Button
            onClick={() => setIsAllowed(true)}
            className="bg-blue-600 hover:bg-blue-800 text-white text-lg px-6 py-3 rounded-lg transition duration-200"
          >
            Enable Camera
          </Button>
        )}
      </div>
    </div>
  );
}

export default MockInterviewInstructions;
