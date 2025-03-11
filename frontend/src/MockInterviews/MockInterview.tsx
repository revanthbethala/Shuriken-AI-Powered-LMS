// // import { useEffect, useState, useRef, useLayoutEffect } from "react";
// // import { AlertTriangle, Mic } from "lucide-react";
// // import useGemini from "@/myComponents/useGemini";
// // import { useInterviewStore } from "@/store/useInterviewStore";
// // import useSpeechToText from "react-hook-speech-to-text";
// // import Webcam from "react-webcam";
// // import { NavLink, useParams } from "react-router";
// // import Loading from "@/pages/Loading";
// // import axios from "axios";
// // import { useUser } from "@clerk/clerk-react";
// // import * as blazeface from "@tensorflow-models/blazeface";
// // import * as tf from "@tensorflow/tfjs";
// // import { motion } from "framer-motion";
// // function GenerateQuestions() {
// //   const { formData } = useInterviewStore();
// //   const { role, interviewType, numberOfQuestions, experience } = formData;

// //   const prompt = `Generate a list of ${numberOfQuestions} ${interviewType} questions for a ${experience} applying for the role of ${role}. The questions should cover all the topics related to ${role}. Format the response as { "questions": ["Q1", "Q2", "Q3", "Q4"] }`;

// //   const { data, error, isLoading } = useGemini(prompt);
// //   const {
// //     error: speechError,
// //     results,
// //     isRecording,
// //     startSpeechToText,
// //     stopSpeechToText,
// //   } = useSpeechToText({
// //     continuous: true,
// //     useLegacyResults: false,
// //   });
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
// //   const [localAnswers, setLocalAnswers] = useState([]); // Manage answers locally
// //   const [isCompleted, setIsCompleted] = useState(false); // Track if interview is completed

// //   useEffect(() => {
// //     if (results.length > 0) {
// //       const latestAnswer = results[results.length - 1]?.transcript;
// //       if (latestAnswer) {
// //         // Store the answer with the corresponding question
// //         setLocalAnswers((prevAnswers) => {
// //           const newAnswers = [...prevAnswers];
// //           newAnswers[currentQuestionIndex] = latestAnswer; // Update the answer for the current question
// //           return newAnswers;
// //         });
// //       }
// //     }
// //   }, [results, currentQuestionIndex]);

// //   if (isLoading) return <Loading />;
// //   if (error) return <p className="font-semibold text-red-600">{error}</p>;
// //   if (!data || !data.questions || data.questions.length === 0) {
// //     return (
// //       <p className="text-red-600 font-semibold">
// //         No questions generated. Please try again.
// //       </p>
// //     );
// //   }

// //   const { questions } = data;

// //   const handleNextQuestion = () => {
// //     if (currentQuestionIndex === questions.length - 1) {
// //       setIsCompleted(true); // Set completed when the last question is answered
// //     }
// //     if (currentQuestionIndex < questions.length - 1) {
// //       setCurrentQuestionIndex(currentQuestionIndex + 1); // Update the current question index
// //     }
// //   };

// //   if (speechError)
// //     return <p>Web Speech API is not available in this browser 🤷‍</p>;

// //   return (
// //     <div className="h-screen overflow-hidden">
// //       {!isCompleted ? (
// //         <div className="grid grid-cols-2 p-4 items-center ">
// //           <div className="flex flex-col gap-2 items-start bg-white bg-opacity-40 p-4 rounded-lg ">
// //             <progress
// //               max={questions.length}
// //               value={currentQuestionIndex + 1}
// //               className="w-full"
// //             ></progress>
// //             <span className="font-semibold">
// //               Question {currentQuestionIndex + 1} / {questions.length}
// //             </span>
// //             <h2 className="font-medium leading-wide font-Inter text-lg">
// //               {questions[currentQuestionIndex]}
// //             </h2>

// //             <div className="mt-4">
// //               <h3 className="font-semibold">Your Answer:</h3>
// //               <p className="text-lg">
// //                 {localAnswers[currentQuestionIndex] ||
// //                   "No answer recorded yet."}
// //               </p>
// //             </div>

// //             <button
// //               onClick={handleNextQuestion}
// //               className={`rounded-lg px-3 py-2 mt-6 font-semibold text-white ${"bg-blue-700"}`}
// //             >
// //               {currentQuestionIndex === questions.length - 1
// //                 ? "Submit"
// //                 : "Next"}
// //             </button>
// //           </div>
// //           <div className="flex flex-col items-center justify-center rounded-xl">
// //             <WebCamComponent />
// //             <RecordingButton
// //               isRecording={isRecording}
// //               startRecording={startSpeechToText}
// //               stopRecording={stopSpeechToText}
// //             />
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="flex items-center justify-center flex-col">
// //           <ShowResults questions={questions} answers={localAnswers} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // const WebCamComponent = () => {
// //   const [faceCount, setFaceCount] = useState(0);
// //   const webcamRef = useRef(null);

// //   useEffect(() => {
// //     const loadModel = async () => {
// //       await tf.ready();
// //       const model = await blazeface.load();
// //       detectFace(model);
// //     };
// //     loadModel();
// //   }, []);

// //   const detectFace = async (model) => {
// //     setInterval(async () => {
// //       const video = webcamRef.current?.video;
// //       if (!video) return;
// //       const predictions = await model.estimateFaces(video, false);
// //       setFaceCount(predictions.length);
// //     }, 500);
// //   };

// //   return (
// //     <div className="relative">
// //       <Webcam ref={webcamRef} className="rounded-xl pb-3" />
// //       {faceCount === 0 || faceCount > 1 ? (
// //         <motion.div
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           exit={{ opacity: 0, y: -10 }}
// //           className="absolute top-2 left-2 bg-red-600 text-white p-3 rounded-lg flex items-center gap-2"
// //         >
// //           <AlertTriangle className="w-5 h-5" />
// //           {faceCount === 0 ? "No face detected!" : "Multiple faces detected!"}
// //         </motion.div>
// //       ) : null}
// //     </div>
// //   );
// // };

// // interface RecordingButtonProps {
// //   isRecording: boolean;
// //   startRecording: () => void;
// //   stopRecording: () => void;
// // }

// // const RecordingButton: React.FC<RecordingButtonProps> = ({
// //   isRecording,
// //   startRecording,
// //   stopRecording,
// // }) => {
// //   return (
// //     <button
// //       onClick={isRecording ? stopRecording : startRecording}
// //       className={`rounded-lg px-3 py-2 mt-5 font-medium text-white outline-0 ${
// //         isRecording ? "bg-red-600" : "bg-blue-700"
// //       } flex gap-2 items-center`}
// //     >
// //       <Mic />
// //       {isRecording ? "Stop Recording" : "Record Answer"}
// //     </button>
// //   );
// // };
// // interface ShowResultsProps {
// //   answers: string[];
// //   questions: string[];
// // }

// // const ShowResults: React.FC<ShowResultsProps> = ({ answers, questions }) => {
// //   const exampleFormat = `{
// //     overallPerformance:"Satisfactory","Unsatisfactory",
// //     overallAssessment:"need to improve at specific field or everything is good"
// //     areaOfImprovement:"give improvement suggestions in 3-4lines",
// //     score:"give overall score as percentage based on the user responses"
// //   }`;
// //   let prompt = "";
// //   for (let i = 0; i < questions.length; i++) {
// //     prompt += `${questions[i]}: ${answers[i] || "Not Answered"}\n`;
// //   }
// //   prompt += `now evaluate all the questions and answers and give the output as ${exampleFormat} format that assesses the performance.  just give the output in JSON format no additional response is required`;
// //   const { id } = useParams();
// //   console.log(id);

// //   const { data, isLoading, error } = useGemini(prompt);
// //   const score = Number(data?.score.replace("%", ""));
// //   console.log("score", score);
// //   const { user } = useUser();
// //   const userId = user?.id;
// //   useLayoutEffect(() => {
// //     async function PostMockScore() {
// //       const res = await axios.put(
// //         `${BASE_URL}/mock/mock-marks/${id}`,
// //         JSON.stringify({ marksObtained: score, userId, testId: id }),
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           withCredentials: true,
// //         }
// //       );
// //       console.log("Form Submitted:", res?.data);
// //     }
// //     if (!isLoading && !error) PostMockScore();
// //   }, [id, score, userId, isLoading, error]);
// //   if (error) return <p className="font-semibold text-red-600">{error}</p>;
// //   if (isLoading) return <Loading />;
// //   let performance: string = data?.overallPerformance;
// //   performance = performance.toLowerCase();

// //   return (
// //     <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-2xl shadow-lg  w-1/2">
// //       <h2 className="text-2xl font-semibold text-blue-700">
// //         Interview Summary
// //       </h2>
// //       {data ? (
// //         <div className="mt-4 space-y-2">
// //           <p
// //             className="text-lg space-x-3
// //               "
// //           >
// //             <span className="font-medium">You Scored:</span>
// //             <span
// //               className={`${
// //                 performance == "unsatisfactory"
// //                   ? "text-red-700"
// //                   : "text-green-700"
// //               }`}
// //             >
// //               {data?.score || "N/A"}
// //             </span>
// //           </p>
// //           <p className="text-lg ">
// //             <span className="font-medium">Your Performance:</span>
// //             <span
// //               className={`${
// //                 performance == "unsatisfactory"
// //                   ? "text-red-700"
// //                   : "text-green-700"
// //               }`}
// //             >
// //               {data?.overallPerformance || "N/A"}
// //             </span>
// //           </p>
// //           <p className="text-lg ">
// //             <span className="font-medium">Your Assessment:</span>{" "}
// //             {data?.overallAssessment || "N/A"}
// //           </p>
// //           <p className="text-lg ">
// //             <span className="font-medium">Area of Improvement:</span>{" "}
// //             {data?.areaOfImprovement || "N/A"}
// //           </p>

// //           <div className="flex gap-2 items-center justify-center p-3">
// //             <NavLink to="/" className="my-btn text-center">
// //               Go To Home
// //             </NavLink>
// //             <NavLink to="/mockinterview" className="my-btn text-center">
// //               Retake Test
// //             </NavLink>
// //           </div>
// //         </div>
// //       ) : (
// //         <p className="mt-4 text-blue-600 italic">Loading interview data...</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default GenerateQuestions;

// import { useEffect, useState, useRef, useLayoutEffect } from "react";
// import { AlertTriangle, Mic, EyeOff, Monitor, ImageOff } from "lucide-react";
// import useGemini from "@/myComponents/useGemini";
// import { useInterviewStore } from "@/store/useInterviewStore";
// import useSpeechToText from "react-hook-speech-to-text";
// import Webcam from "react-webcam";
// import { NavLink, useParams } from "react-router";
// import Loading from "@/pages/Loading";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// import * as blazeface from "@tensorflow-models/blazeface";
// import * as faceapi from "face-api.js";
// import * as tf from "@tensorflow/tfjs";
// import { motion } from "framer-motion";
// import { useToast } from "@/components/ui/use-toast";

// const WebCamComponent = () => {
//   const [faceCount, setFaceCount] = useState(0);
//   const [cheatingDetected, setCheatingDetected] = useState("");
//   const webcamRef = useRef(null);
//   const { toast } = useToast();

//   useEffect(() => {
//     const loadModel = async () => {
//       await tf.ready();
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//       await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
//       await faceapi.nets.faceExpressionNet.loadFromUri("/models");
//       const model = await blazeface.load();
//       detectFace(model);
//     };
//     loadModel();
//   }, []);

//   const detectFace = async (model) => {
//     setInterval(async () => {
//       const video = webcamRef.current?.video;
//       if (!video) return;
//       const predictions = await model.estimateFaces(video, false);
//       setFaceCount(predictions.length);

//       if (predictions.length === 0) {
//         setCheatingDetected("No Face Detected!");
//         showToast("No face detected!", <EyeOff className="w-5 h-5" />);
//       } else if (predictions.length > 1) {
//         setCheatingDetected("Multiple Faces Detected!");
//         showToast("Multiple faces detected!", <AlertTriangle className="w-5 h-5" />);
//       } else {
//         const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
//         if (detections.length > 0) {
//           const { expressions } = detections[0];
//           if (expressions.surprised > 0.7 || expressions.fearful > 0.7) {
//             setCheatingDetected("Suspicious Expressions!");
//             showToast("Suspicious expressions detected!", <AlertTriangle className="w-5 h-5" />);
//           }
//         }
//       }
//     }, 500);
//   };

//   const showToast = (message, icon) => {
//     toast({
//       title: "Cheating Alert",
//       description: message,
//       icon: icon,
//       duration: 4000,
//       className: "bg-red-600 text-white",
//     });
//   };

//   useEffect(() => {
//     document.addEventListener("visibilitychange", () => {
//       if (document.hidden) {
//         setCheatingDetected("Tab Switched!");
//         showToast("Tab switched detected!", <Monitor className="w-5 h-5" />);
//       }
//     });
//   }, []);

//   return (
//     <div className="relative">
//       <Webcam ref={webcamRef} className="rounded-xl pb-3" />
//       {cheatingDetected && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="absolute top-2 left-2 bg-red-600 text-white p-3 rounded-lg flex items-center gap-2"
//         >
//           <AlertTriangle className="w-5 h-5" />
//           {cheatingDetected}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default WebCamComponent;
