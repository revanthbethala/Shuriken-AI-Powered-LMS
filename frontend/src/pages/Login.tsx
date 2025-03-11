import Logo from "@/myComponents/Logo";
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

function Login() {
  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center pb-8">
        <Logo />
      </div>
      <div className="flex items-center justify-center w-full lg:justify-around space-x-8">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="src/assets/loginImage.png"
            alt="login"
            className="rounded shadow-sm"
          />
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SignIn signUpUrl="/signup" forceRedirectUrl="/" />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Login;
