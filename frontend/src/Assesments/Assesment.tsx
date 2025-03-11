import useUserPreferencesStore from "@/store/useUserPreferencesStore";
import { useAssessmentStore } from "@/store/useAssesmentStore";
import useGemini from "@/myComponents/useGemini";
import Loading from "../pages/Loading";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { BASE_URL } from "@/data";
export default function Assessment() {
  const { formData } = useAssessmentStore();
  const { category, difficulty, timeLimit, numberOfQuestions } = formData;
  const exampleFormat: string = `[{
      question:Question",
      options:[opt1,op2,opt3,opt4],
        correctAnswer:"opt1", ]}]`;
  const { formData: userForm } = useUserPreferencesStore();
  const { study, experience, domain1, domain2 } = userForm;

  const content = `Generate ${numberOfQuestions} quiz questions in the ${category} category at the ${difficulty} level. The questions should be tailored for a person with ${study} and ${experience}, who is interested in ${domain1} and ${domain2}. Each question should be an object containing a question, four answer choices (A, B, C, and D), and a correctAnswer field indicating the correct option in this format ${exampleFormat}. Ensure clarity, accessibility, and suitability in the subject.`;
  const { data, error, isLoading } = useGemini(content);
  if (
    !category ||
    !difficulty ||
    !numberOfQuestions ||
    !study ||
    !experience ||
    !domain1 ||
    !domain2
  ) {
    return;
  }
  if (isLoading) return <Loading />;
  if (error) return <p className="font-semibold text-red-600">{error}</p>;

  return (
    <div className="h-screen">
      <Quiz quizData={data} timeLimit={timeLimit} />
    </div>
  );
}

export function Quiz({ quizData, timeLimit }) {
  const timePerQuestion = (timeLimit * 60) / quizData.length; // Time per question based on the total time limit
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(timePerQuestion); // Timer set for each question
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Effect to handle the countdown timer
  useEffect(() => {
    if (quizCompleted || timer === 0) return; // Stop timer if quiz is completed or time is up

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, quizCompleted]);

  // Handle selecting an answer
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    // Check if the answer is correct and update the score
    if (selectedAnswer === quizData[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1); // Increment score if answer is correct
    }

    setSelectedAnswer(null); // Reset selected answer for the next question
    const nextQuestionIndex = currentQuestionIndex + 1;

    // If it's the last question, finish the quiz
    if (nextQuestionIndex === quizData.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex); // Move to the next question
      setTimer(timePerQuestion); // Reset the timer for the next question
    }
  };

  // Handle timer expiration (go to the next question automatically)
  useEffect(() => {
    if (timer === 0 && !quizCompleted) {
      handleNextQuestion(); // Automatically move to the next question when time is up
    }
  }, [timer]);

  // Show current question
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="h-fit max-w-xl mx-auto">
      {!quizCompleted ? (
        <div className=" bg-white p-6 rounded-xl shadow-lg">
          <progress
            value={currentQuestionIndex + 1}
            max={quizData.length}
            className="w-full h-4 bg-gray-200 rounded-lg appearance-none"
          >
            <div className="bg-blue-500 rounded-lg h-full"></div>
          </progress>
          <h2 className="font-medium text-xl font-Inter">
            Question {currentQuestionIndex + 1}
          </h2>

          <div className="text-center mb-6">
            <p className="text-lg font-semibold">Time Left: {timer} seconds</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-medium">{currentQuestion.question}</p>
          </div>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-3 px-4 rounded-lg border-2 ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <ShowResults score={score} totalQuestions={quizData.length} />
      )}
    </div>
  );
}
function ShowResults({ score, totalQuestions }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;
  const percentageObtained = (score / totalQuestions) * 100;
  const { id } = useParams();
  useEffect(() => {
    async function PostTestScore() {
      const res = await axios.put(
        `${BASE_URL}/tests/storeMarks/${id}`,
        JSON.stringify({ marksObtained: percentageObtained, userId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Form Submitted:", res?.data);
      console.log(id);
      navigate(`/tests/start/${id}`);
    }
    PostTestScore();
  }, [id,percentageObtained,userId]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white bg-opacity-20 p-8">
        <div className="font-semibold flex flex-col items-center justify-center py-12 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-Inter mb-4">You Scored</h2>
          <h3
            className={`text-4xl font-bold font-Inter ${
              percentageObtained > 45 ? "text-blue-600" : "text-red-600"
            } mb-6`}
          >
            {percentageObtained}%
          </h3>

          <p className="text-lg font-medium text-gray-700 mb-6">
            {percentageObtained > 45
              ? "You’ve completed the quiz! Review your results and retake the test to improve your score."
              : "I am sorry You couldn't finish the Quiz Please try again"}
          </p>
          <div className="flex gap-3">
            <NavLink
              to={percentageObtained > 45 ? `\courses` : "\tests"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              {percentageObtained > 45 ? "View Courses" : "Retake Test"}
            </NavLink>
            <NavLink
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Go to Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
