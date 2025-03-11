import express from "express";
import {
  createCourse,
  editCourse,
  getPublishedCourses,
  getCreatorCourses,
  getCourseById,
  createLecture,
  getCourseLectures,
  editLecture,
  removeLecture,
  getLectureById,
  getUserCourses,
  storeSummary,
} from "../controllers/course.controller.js";
// import multer from "multer";
import upload from "../middlewares/multer.js";
const router = express.Router();
router.route("/create").post(createCourse);
router
  .route("/edit/:courseId")
  .put(upload.single("courseThumbnail"), editCourse);
router.route("/published").get(getPublishedCourses);
router.route("/creator/:id").get(getCreatorCourses);
router.route("/:courseId").get(getCourseById);
router.route("/userCourses").get(getUserCourses);
router.route("/:courseId/lecture").post(createLecture);
router.route("/:courseId/lectures").get(getCourseLectures);
router
  .route("/:courseId/lecture/:lectureId")
  .put(upload.single("file"), editLecture);
router.route("/:courseId/lecture/:lectureId").delete(removeLecture);
router.route("/lecture/:lectureId").get(getLectureById);
router.route("/summary/:lectureId").post(storeSummary)


export default router;
