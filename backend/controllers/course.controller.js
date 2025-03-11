import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import Lecture from "../models/lecture.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { userId, courseTitle, category } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newCourse = new Course({ courseTitle, category, creator: user._id });
    await newCourse.save();
    console.log(newCourse.type)
    user.courses.push(newCourse);
    await user.save();

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      courseTitle,
      subTitle,
      description,
      courseLevel,
      coursePrice,
      isPublished,
    } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    console.log("Course found", course);
    let courseThumbnail = course.courseThumbnail;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      courseThumbnail = await uploadMedia(fileUri.content);
      console.log(courseThumbnail);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        subTitle,
        description,
        courseLevel,
        coursePrice,
        courseThumbnail: courseThumbnail.url,
        isPublished,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching published courses",
      error: error.message,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne( {userId:id} );
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const courses = await Course.find({ creator: user._id });
    res.status(200).json({ courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate(
      "creator",
      "fullName email"
    );
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

export const getUserCourses = async (req,res)=>{
  try {
    const { userId } = req.params;
    const enrolledCourses = await Course.find({ enrolledStudents: userId });

    if (enrolledCourses.length === 0) {
      return res.status(200).json({ message: "No enrolled courses found", enrolledCourses: [] });
    }

    res.status(200).json({ enrolledCourses });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//Lectures controllers

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newLecture = new Lecture({ lectureTitle });
    await newLecture.save();

    course.lectures.push(newLecture._id);
    await course.save();

    res
      .status(201)
      .json({ message: "Lecture created successfully", lecture: newLecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating lecture", error: error.message });
  }
};

// Get all lectures of a specific course
export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lectures", error: error.message });
  }
};
export const editLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { lectureTitle, isPreviewFree } = req.body;

    // Find the course and ensure the lecture exists
    const course = await Course.findById(courseId);
    if (!course || !course.lectures.includes(lectureId)) {
      return res
        .status(404)
        .json({ message: "Lecture not found in this course" });
    }

    const lecture = await Lecture.findById(lectureId);
    console.log("lecture", lecture);

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    let newVideoUrl = lecture.videoUrl;
    // console.log(newPublicId, newVideoUrl);

    let newPublicId = lecture.publicId;

    // Check if a new video is uploaded
    if (req.file) {
      // Convert file to Data URI format
      const fileUri = getDataUri(req.file);

      // Upload new video to Cloudinary
      const cloudinaryResponse = await uploadMedia(fileUri.content);

      if (cloudinaryResponse) {
        newVideoUrl = cloudinaryResponse.secure_url;
        newPublicId = cloudinaryResponse.public_id;
        console.log(newPublicId, newVideoUrl);

        // Delete old video from Cloudinary
        if (lecture.publicId) {
          await deleteVideoFromCloudinary(lecture.publicId);
        }
      }
    }

    // Update lecture details
    lecture.lectureTitle = lectureTitle || lecture.lectureTitle;
    lecture.videoUrl = newVideoUrl;
    lecture.publicId = newPublicId;
    lecture.isPreviewFree =
      isPreviewFree !== undefined ? isPreviewFree : lecture.isPreviewFree;

    await lecture.save();

    res.status(200).json({ message: "Lecture updated successfully", lecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating lecture", error: error.message });
  }
};

// Remove a lecture (from Cloudinary & DB)
export const removeLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);
    if (!course || !course.lectures.includes(lectureId)) {
      return res
        .status(404)
        .json({ message: "Lecture not found in this course" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // Remove from Cloudinary if video exists
    if (lecture.publicId) {
      await cloudinary.uploader.destroy(lecture.publicId);
    }

    // Remove from course lectures array
    course.lectures = course.lectures.filter(
      (id) => id.toString() !== lectureId
    );
    await course.save();

    // Delete lecture from DB
    await Lecture.findByIdAndDelete(lectureId);

    res.status(200).json({ message: "Lecture removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lecture", error: error.message });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json({ lecture });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching lecture", error: error.message });
  }
};

export const storeSummary = async(req,res)=>{
  try{
    const {summary,transcription} = req.body;
    const {lectureId} = req.params

    const lecture = await Lecture.findById(lectureId)
    if(!lecture){
      return res.status(404).json({message: "Lecture not found"})
    }
    lecture.summary = summary
    lecture.transcription = transcription
    await lecture.save()
    res.status(200).json({message: "Summary and transcription updated successfully", lecture})
  }catch (error) {
    res
     .status(500)
     .json({ message: "Error updating summary and transcription", error: error.message });
  }
}
