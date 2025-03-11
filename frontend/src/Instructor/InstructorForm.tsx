import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";

const InstructorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    education: "",
    workExperience: "",
    workingProfession: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    age: false,
    education: false,
    workingProfession: false,
  });
  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for that field on change
    setErrors({
      ...errors,
      [name]: value.trim() === "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      age: formData.age.trim() === "",
      education: formData.education.trim() === "",
      workingProfession: formData.workingProfession.trim() === "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/instructor/addCourse");
      localStorage.setItem("instructorFirstVisit", "true");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-lg mx-auto p-6 md:bg-white/80 shadow-lg backdrop-blur-md rounded-2xl border border-gray-200 h-fit mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Become an Instructor 🚀
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Age", name: "age", type: "number" },
          { label: "Education", name: "education", type: "text" },
          {
            label: "Working Profession",
            name: "workingProfession",
            type: "text",
          },
        ].map(({ label, name, type }) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative"
          >
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}:
            </label>
            <Input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`mt-1 block w-full p-3 border ${errors[name] ? "border-red-500" : "border-gray-300"
                } rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200`}
            />
            {errors[name] && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </motion.div>
        ))}

        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
        >
          <NavLink to="instructor/addcourse"> Submit</NavLink>
        </Button>
      </form>
    </motion.div>
  );
};

export default InstructorForm;
