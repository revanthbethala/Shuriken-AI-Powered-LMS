import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import { uploadMedia } from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName, userId } = req.body;
    if (!companyName) {
      res.status(400).json({
        message: "provide an company name",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      res.status(400).json({
        message: "you cant register the same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: userId,
    });
    return res.status(201).json({
      message: "company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const { userId } = req.body;
    const companies = await Company.find(userId);
    if (!companies) {
      res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompaniesByUserId = async (req, res) => {
  try {
    const  userId  = req.params.id;
    console.log(userId);
    const companies = await Company.find({userId});
    if (!companies) {
      res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    // if (req.file) {
    //   const fileUri = getDataUri(req.file);
    //   console.log("Company data", company);
    //   if (company?.logo) {
    //     const publicId = company?.logo.split("/").pop().split(".")[0];
    //     await deleteMediaFromCloudinary(publicId);
    //   }
    //    logo = await uploadMedia(fileUri.content);
    //   console.log(logo);
    // }
    const updateData = { name, description, website, location };
    const updated_company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updated_company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      updated_company,
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
