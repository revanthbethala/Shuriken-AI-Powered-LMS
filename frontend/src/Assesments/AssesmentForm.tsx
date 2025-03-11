import { categories } from "@/data";
import { useAssessmentStore } from "@/store/useAssesmentStore";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const options = categories.map((category) => category.name);
const difficultyLevels = ["Easy", "Medium", "Hard"];
const timeLimits = [10, 20];
const questionCounts = [10, 20];

// interface FormData {
//   category: string;
//   difficulty: string;
//   timeLimit: number;
//   numberOfQuestions: number;
// }

interface Errors {
  category?: string;
  difficulty?: string;
  timeLimit?: string;
  numberOfQuestions?: string;
}

function AssessmentForm() {
  const navigate = useNavigate();
  const { formData, errors, setFormData, setError, resetErrors } =
    useAssessmentStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(
      name as keyof typeof formData,
      name === "timeLimit" || name === "numberOfQuestions"
        ? Number(value)
        : value
    );
  };

  const handleDifficultyChange = (level: string) => {
    setFormData("difficulty", level);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: Errors = {};
    if (!formData.category) validationErrors.category = "Category is required!";
    if (!formData.difficulty)
      validationErrors.difficulty = "Difficulty level is required!";
    if (!formData.timeLimit)
      validationErrors.timeLimit = "Time limit is required!";
    if (!formData.numberOfQuestions)
      validationErrors.numberOfQuestions = "Number of questions is required!";

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((field) =>
        setError(field as keyof Errors, validationErrors[field as keyof Errors])
      );
      return;
    }

    resetErrors();
    navigate("instructions");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative backdrop-blur-xl rounded-2xl p-8 shadow-xl max-w-lg w-full border border-gray-300"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Test Your Knowledge
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Field */}
          <div>
            <label className="block text-gray-900 text-lg mb-2 font-medium">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-300 transition bg-white"
            >
              <option value="">Select a subject area</option>
              {options.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-gray-900 text-lg mb-2 font-medium">
              Difficulty Level
            </label>
            <div className="flex space-x-3">
              {difficultyLevels.map((level, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleDifficultyChange(level)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 rounded-lg text-lg border border-gray-400 transition ${
                    formData.difficulty === level
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
            {errors.difficulty && (
              <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>
            )}
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-gray-900 text-lg mb-2 font-medium">
              Time Limit
            </label>
            <select
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-300 transition bg-white"
            >
              <option value="">Select duration (in minutes)</option>
              {timeLimits.map((limit) => (
                <option key={limit} value={limit}>
                  {limit} minutes
                </option>
              ))}
            </select>
            {errors.timeLimit && (
              <p className="text-red-500 text-sm mt-1">{errors.timeLimit}</p>
            )}
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-gray-900 text-lg mb-2 font-medium">
              Number of Questions
            </label>
            <select
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-300 transition bg-white"
            >
              <option value="">Select question count</option>
              {questionCounts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            {errors.numberOfQuestions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numberOfQuestions}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Start Assessment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AssessmentForm;
