import Application from "../models/application.model.js";
import Job from "../models/jobs.model.js";
import User from "../models/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const { userId } = req.body;
    const jobId = req.params.id;

    console.log(userId, jobId);

    if (!jobId) {
      return res.status(404).json({
        message: "Job ID is required",
        success: false,
      });
    }
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const userObjectId = user._id;
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userObjectId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userObjectId,
    });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in applyJob:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "status is required",
        success: false,
      });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application is not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
