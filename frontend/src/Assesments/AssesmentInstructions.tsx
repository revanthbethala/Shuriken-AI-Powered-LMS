import { useNavigate } from "react-router";
import { useAssessmentStore } from "../store/useAssesmentStore";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { BASE_URL } from "@/data";

function AssessmentInstructions() {
  const navigate = useNavigate();
  const { formData } = useAssessmentStore();
  const {
    category,
    difficulty: difficultyLevel,
    timeLimit: testDuration,
    numberOfQuestions: noOfQuestions,
  } = formData;
  const { user } = useUser();
  const userId = user?.id;
  const sendData = {
    userId,
    category,
    difficultyLevel,
    testDuration,
    noOfQuestions,
  };
  async function PostData() {
    const res = await axios.post(
      `${BASE_URL}/tests/store`,
      JSON.stringify(sendData),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(res)
    const id = res?.data?.test?._id;
    navigate(`/assessments/start/${id}`);
  }

  return (
    <div className="flex pb-10 justify-center items-center pt-6 px-4 sm:px-8">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Quiz Instructions
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to the {category} quiz! Before you begin, please read the
          following instructions carefully:
        </p>

        <div className="mb-3 space-y-3 text-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-lg font-semibold text-blue-600">
              1. Category:
            </span>
            <p className="text-lg">{category}</p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-lg font-semibold text-blue-600">
              2. Difficulty:
            </span>
            <p className="text-lg">{difficultyLevel}</p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-lg font-semibold text-blue-600">
              3. Time Limit:
            </span>
            <p className="text-lg">{testDuration} minutes</p>
          </div>

          <div className="flex items-start space-x-3">
            <span className="text-lg font-semibold text-blue-600">
              4. Number of Questions:
            </span>
            <p className="text-lg">{noOfQuestions}</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Quiz Rules:
        </h3>

        <ul className="list-inside list-disc text-lg text-gray-700 space-y-3">
          <li>
            You will have a fixed time of {testDuration} minutes to complete the
            quiz.
          </li>
          <li>The quiz consists of {noOfQuestions} questions.</li>
          <li>
            Please ensure you choose the correct answer for each question.
          </li>
          <li>No external help or resources are allowed during the quiz.</li>
          <li>
            Once you start the quiz, you cannot pause it. Make sure you have
            enough time.
          </li>
          <li>Your results will be shown after you finish the quiz.</li>
        </ul>

        <div className="mt-6 text-center">
          <button
            onClick={PostData}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssessmentInstructions;
