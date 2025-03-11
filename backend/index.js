import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import testsRoutes from "./routes/tests.route.js";
import courseRoutes from "./routes/course.route.js";
import mockRoutes from "./routes/mock.route.js";
import companyRoutes from "./routes/company.route.js";
import applicationRoutes from "./routes/application.route.js";
import jobRoutes from "./routes/jobs.route.js";
import paymentsRoutes from "./routes/purchaseCourse.route.js";
import courseRatingRoute from "./routes/courseRating.route.js";

const app = express();
dotenv.config();
connectDB();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the Home Page",
    success: true,
  });
});

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tests", testsRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/mock", mockRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/payments", paymentsRoutes);
app.use("/api/v1/courseRating",courseRatingRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
