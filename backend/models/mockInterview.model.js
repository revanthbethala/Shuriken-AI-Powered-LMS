import mongoose from "mongoose";

const mockSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["HR", "Technical"],
      required: true,
    },
    experience: {
      type: String, // Duration in minutes
      enum:["Fresher","Entry","Senior"],
      required: true,
    },
    noOfQuestions: {
      type: Number,
      enum:[10,20],
      required: true,
    },
    marksObtained: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mock", mockSchema);
