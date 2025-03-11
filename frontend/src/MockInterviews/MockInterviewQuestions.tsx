import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import useGemini from "@/myComponents/useGemini";
import { useInterviewStore } from "@/store/useInterviewStore";
import useSpeechToText from "react-hook-speech-to-text";
// import { useParams } from "react-router";
import Loading from "@/pages/Loading";
// import axios from "axios";
import FaceDetection from "./FaceDetection";

function MockInterviewQuestions() {
  const { formData } = useInterviewStore();
  const { role, interviewType, numberOfQuestions, experience } = formData;

  const prompt = ` Generate a list of ${numberOfQuestions} ${interviewType} questions for a ${experience} applying for the role of ${role}. The questions should cover all the topics related to ${role}. Format the response as { "questions": ["Q1", "Q2", "Q3", "Q4"] };
`;
  const { data, error, isLoading } = useGemini(prompt);
  const {
    error: speechError,
    results,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      const latestResult = results[results.length - 1];
      if (typeof latestResult === "object" && "transcript" in latestResult) {
        const latestAnswer = latestResult.transcript;
        if (latestAnswer) {
          setLocalAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = latestAnswer;
            return newAnswers;
          });
        }
      }
    }
  }, [results, currentQuestionIndex]);

  if (isLoading) return <Loading />;
  if (error) return <p className="font-semibold text-red-600">{error}</p>;
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <p className="text-red-600 font-semibold">
        No questions generated. Please try again.
      </p>
    );
  }
  const { questions } = data;

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsCompleted(true);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (speechError)
    return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="h-screen overflow-hidden">
      {!isCompleted ? (
        <div className="grid grid-cols-2 p-4 items-center">
          {/* Question Section */}
          <div className="flex flex-col gap-2 items-start bg-white bg-opacity-40 p-4 rounded-lg">
            <progress
              max={questions.length}
              value={currentQuestionIndex + 1}
              className="w-full"
            ></progress>
            <span className="font-semibold">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
            <h2 className="font-medium leading-wide font-Inter text-lg">
              {questions[currentQuestionIndex]}
            </h2>

            <div className="mt-4">
              <h3 className="font-semibold">Your Answer:</h3>
              <p className="text-lg">
                {localAnswers[currentQuestionIndex] ||
                  "No answer recorded yet."}
              </p>
            </div>

            <button
              onClick={handleNextQuestion}
              className="rounded-lg px-3 py-2 mt-6 font-semibold text-white bg-blue-700"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
            <div>
              <RecordingButton
                isRecording={isRecording}
                startRecording={startSpeechToText}
                stopRecording={stopSpeechToText}
              />
            </div>
          </div>
          <FaceDetection />
          {/* Recording Button */}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <ShowResults questions={questions} answers={localAnswers} />
        </div>
      )}
    </div>
  );
}

const RecordingButton = ({ isRecording, startRecording, stopRecording }) => {
  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={` w-fit rounded-lg px-3 py-2 mt-5 font-medium text-white outline-0 ${
        isRecording ? "bg-red-600" : "bg-blue-700"
      } flex gap-2 items-center`}
    >
      <Mic />
      {isRecording ? "Stop Recording" : "Record Answer"}
    </button>
  );
};

const ShowResults = ({ answers, questions }) => {
  // const { id } = useParams();

  let prompt = "";
  for (let i = 0; i < questions.length; i++) {
    prompt += `${questions[i]}: ${answers[i] || "Not Answered"}\n`;
  }
  prompt += `Evaluate the following answers and return a JSON object in this exact format:
{
  "overallPerformance": "string",
  "overallAssessment": "string",
  "areaOfImprovement": "string",
  "score": "string"
}
Return only the JSON object without any explanations.`;

  const { data, isLoading, error } = useGemini(prompt);
  // const { user } = useUser();
  // const userId = user?.id;
  // const score = Number(data?.score?.replace("%", ""));

  // useLayoutEffect(() => {
  //   if (!isLoading && !error) {
  //     axios.put(`http://localhost:8000/api/v1/mock/mock-marks/${id}`, {
  //       marksObtained: score,
  //       userId,
  //       testId: id,
  //     });
  //   }
  // }, [id, score, userId, isLoading, error]);

  if (isLoading) return <Loading />;
  if (error) return <p className="font-semibold text-red-600">{error}</p>;

  return (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-2xl shadow-lg w-1/2">
      <h2 className="text-2xl font-semibold text-blue-700">
        Interview Summary
      </h2>
      <p>Your Score: {data?.score || "N/A"}</p>
      <p>Performance: {data?.overallPerformance || "N/A"}</p>
      <p>Assessment: {data?.overallAssessment || "N/A"}</p>
      <p>Improvements: {data?.areaOfImprovement || "N/A"}</p>
    </div>
  );
};

export default MockInterviewQuestions;
