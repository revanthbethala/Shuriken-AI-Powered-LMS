import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  publicId: { type: String },
  isPreviewFree: { type: Boolean },
  summary:{ type: String},
  transcription:{ type: String},
},{timestamps:true});

export default mongoose.model("Lecture", lectureSchema);