// import useGemini from "@/myComponents/useGemini";
// import Loading from "@/pages/Loading";

// const MockInterviewResult = () => {
//   // const { mockId } = useParams();
//   const { state } = useLocation() || {};
//   const { answers = [], questions = [] } = state || {};

//   console.log("state", state);

//   const exampleFormat = `{ "overallPerformance": "Satisfactory", "overallAssessment": "Needs improvement", "areaOfImprovement": "Suggestions", "score": "80%" }`;

//   let prompt = questions
//     .map((q, i) => `${q}: ${answers[i] || "Not Answered"}`)
//     .join("\n");
//   prompt += `\nEvaluate answers and return a JSON output in the following format: ${exampleFormat}`;

//   const { data, isLoading, error } = useGemini(prompt);
//   // const userId = GetUserId();

//   // const hasUpdated = useRef(false); // ✅ Prevents duplicate API requests

//   // useEffect(() => {
//   //   if (!isLoading && !error && data?.score && !hasUpdated.current) {
//   //     hasUpdated.current = true; // ✅ Ensures only one request is sent

//   //     const score = Number(data.score.replace("%", ""));
//   //     if (!isNaN(score)) {
//   //       axios
//   //         .put(`${BASE_URL}/mock/mock-marks/${mockId}`, {
//   //           marksObtained: score,
//   //           userId,
//   //           testId: mockId,
//   //         })
//   //         .then((res) => console.log("Marks updated:", res))
//   //         .catch((err) => {
//   //           console.error("Error updating marks:", err);
//   //           hasUpdated.current = false; // Allow retry on failure
//   //         });
//   //     }
//   //   }
//   // }, []); // ✅ Runs only when `data` updates

//   if (isLoading) return <Loading />;
//   if (error)
//     return (
//       <p className="font-semibold text-red-600">
//         {error.message || "An error occurred"}
//       </p>
//     );

//   return (
//     <>
//       <div className="h-screen flex flex-col items-center justify-center">
//         <div className="mt-6 p-6 bg-blue-50 border border-blue-300 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-semibold text-blue-700">
//             Interview Summary
//           </h2>
//           <p>Your Score: {data?.score || "N/A"}</p>
//           <p>Performance: {data?.overallPerformance || "N/A"}</p>
//           <p>Assessment: {data?.overallAssessment || "N/A"}</p>
//           <p>Improvements: {data?.areaOfImprovement || "N/A"}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MockInterviewResult;
