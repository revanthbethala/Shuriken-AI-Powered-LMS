import { motion } from "framer-motion";
import Logo from "@/myComponents/Logo";
import { SignUp } from "@clerk/clerk-react";

function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-12">
      <div className="flex justify-center pb-2">
        <Logo />
      </div>
      <div className="flex justify-evenly items-center ">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SignUp
            signInUrl="/login"
            forceRedirectUrl="/"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg py-2 px-4 transition-all",
                formButton:
                  "text-indigo-600 border border-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg py-2 px-4 transition-all",
                inputField:
                  "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              },
            }}
          />
        </motion.div>

      </div>
    </div>
  );
}

export default Signup;
