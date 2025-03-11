import mongoose from "mongoose";

const courseRatingSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  user_id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: false },
  created_at: { type: Date, default: Date.now() }
},{timestamps:true});

const CourseRating = mongoose.model('CourseRating',courseRatingSchema)

export default CourseRating
