import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    testDuration: {
      type: Number, // Duration in minutes
      required: true,
    },
    noOfQuestions: {
      type: Number,
      required: true,
    },
    marksObtained: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Test", TestSchema);
