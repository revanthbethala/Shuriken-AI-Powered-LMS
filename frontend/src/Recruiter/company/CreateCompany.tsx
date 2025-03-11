import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GetUserId from "@/helperFunctions/GetUserId";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import { BASE_URL } from "@/data";

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const userId = GetUserId();
  const [isRegistered, setIsRegistered] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const createCompanyHandler = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/company/register`,
        { userId, companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Registered company ID:", res);
      setIsRegistered(res?.data?.success);
      setCompanyId(res?.data?.company?._id);
      toast.success("Company registered successfully!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to register company");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50"
    >
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Register Your Company
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Provide some basic details about your company
        </p>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="companyName"
              className="text-sm font-medium text-gray-700"
            >
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={createCompanyHandler}>Register</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6 text-lg">
          {isRegistered && (
            <NavLink to={`editCompany/${companyId}`}>
              <Button>Update Company Details</Button>
            </NavLink>
          )}
        </div>
    </motion.div>
  );
};

export default RegisterCompany;
