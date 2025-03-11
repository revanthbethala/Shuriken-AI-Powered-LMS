import  { useEffect } from "react";
import useUserPreferencesStore from "../store/useUserPreferencesStore"; // Import Zustand store
import { useNavigate } from "react-router";
import { userPreferences } from "@/data";
import Logo from "@/myComponents/Logo";

function UserPreferences() {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit } =
    useUserPreferencesStore();
  useEffect(() => {
    if (formData.isValid) {
      navigate("/");
    }
  }, [formData.isValid, navigate]);

  return (
    <div className="bg-gray-50 h-screen">
      <div className="text-center flex justify-center p-5">
        <Logo />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 p-4">
        {/* Hide image on mobile and tablet */}
        <div className="hidden md:block">
          <img src={userPreferences} alt="user" />
        </div>
        <div className="shadow-md rounded-lg max-w-fit">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 rounded-lg max-w-md mx-auto bg-gray-50"
          >
            <div>
              <label
                htmlFor="email"
                className="text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="username"
                  className="text-lg font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="text-lg font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min={10}
                  max={100}
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.age}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="study"
                  className="text-lg font-medium text-gray-700"
                >
                  Education Level
                </label>
                <select
                  name="study"
                  id="study"
                  value={formData.study}
                  onChange={handleChange}
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                >
                  <option value="">Select Education Level</option>
                  {[
                    "PhD",
                    "Graduation",
                    "Under-graduation",
                    "Diploma",
                    "Intermediate",
                    "SSC",
                  ].map((study, index) => (
                    <option key={index} value={study}>
                      {study}
                    </option>
                  ))}
                </select>
                {errors.study && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.study}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="text-lg font-medium text-gray-700"
                >
                  Professional Experience
                </label>
                <select
                  name="experience"
                  id="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                >
                  <option value="">Select Experience Level</option>
                  {[
                    "Newbie",
                    "Beginner",
                    "Intermediate",
                    "Expert",
                    "Professional",
                  ].map((exp, index) => (
                    <option key={index} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="domain1"
                  className="text-lg font-medium text-gray-700"
                >
                  Interested Domain 1
                </label>
                <input
                  type="text"
                  name="domain1"
                  id="domain1"
                  value={formData.domain1}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                {errors.domain1 && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.domain1}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="domain2"
                  className="text-lg font-medium text-gray-700"
                >
                  Interested Domain 2
                </label>
                <input
                  type="text"
                  name="domain2"
                  id="domain2"
                  value={formData.domain2}
                  onChange={handleChange}
                  required
                  className="w-full p-2.5 mt-1 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
                {errors.domain2 && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.domain2}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserPreferences;
