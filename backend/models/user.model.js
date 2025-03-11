import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isSignedIn: {
      type: Boolean,
      default: false,
    },
    resume: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["student", "instructor","recuiter"],
      default: "student",
    },
    shuriCoins:{
      type:Number,
      default:0
    },
    website:{
      type:String,
      unique:true
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    mockInterviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mock",
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
