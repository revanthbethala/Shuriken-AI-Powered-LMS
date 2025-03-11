import Job from "../models/jobs.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      experience,
      positions,
      companyId,
    } = req.body;
    console.log(
      userId,
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      experience,
      positions,
      companyId
    );
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobtype,
      experienceLevel: experience,
      positions,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "new job created sucessully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const { adminId } = req.params;
    const jobs = await Job.find({ created_by: adminId });
    console.log(jobs);
    if (!jobs) {
      res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
