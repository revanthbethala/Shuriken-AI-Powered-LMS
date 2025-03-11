import express from "express"
import { addRating, getCourseRating, getCourseReviews } from "../controllers/courseRating.controller.js";


const router = express.Router();

router.post("/rate-course", addRating);
router.get("/course-rating/:course_id", getCourseRating);
router.get("/course-reviews/:course_id",getCourseReviews)

export default router;