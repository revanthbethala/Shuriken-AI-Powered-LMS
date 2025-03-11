import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-toastify";

export default function JobForm() {
  const [expandedSection, setExpandedSection] = useState<string>("personal");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {};

    // Required fields validation
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "degree",
      "university",
      "graduationYear",
      "major",
      "jobTitle",
      "company",
      "duration",
      "responsibilities",
      "technicalSkills",
      "softSkills",
    ];

    requiredFields.forEach((field) => {
      if (!formData.get(field) || formData.get(field) === "") {
        errors[field] = "This field is required";
      }
    });

    // Email validation
    const email = formData.get("email") as string;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      errors["email"] = "Please enter a valid email address";
    }

    // Resume validation
    const resume = formData.get("resume") as File;
    if (!resume || resume.name === "") {
      errors["resume"] = "Please upload your resume";
    }

    return errors;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    try {
      const data = Object.fromEntries(formData.entries());
      console.log(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success("Your Form Submitted Successfully");
      setFormErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const sectionVariants = {
    collapsed: { height: 0, opacity: 0, overflow: "hidden" },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center items-center min-h-screen bg-gray-50 p-6"
      >
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900">
                Application Submitted!
              </h2>
              <p className="text-gray-600">
                Thank you for your application. We will review your information
                and get back to you soon.
              </p>
              <Button onClick={() => setIsSubmitted(false)} className="mt-4">
                Submit Another Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6"
    >
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1 border-b pb-6">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Job Application Form
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">
              Please fill out all required fields to submit your application
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Personal Information */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("personal")}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>
                {expandedSection === "personal" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <Separator />

              <motion.div
                variants={sectionVariants}
                initial={
                  expandedSection === "personal" ? "expanded" : "collapsed"
                }
                animate={
                  expandedSection === "personal" ? "expanded" : "collapsed"
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    className={formErrors.fullName ? "border-red-500" : ""}
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-sm">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, City, Country"
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-sm">{formErrors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio/Website</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    placeholder="johndoe.com"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Educational Background */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("education")}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Educational Background
                </h3>
                {expandedSection === "education" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <Separator />

              <motion.div
                variants={sectionVariants}
                initial={
                  expandedSection === "education" ? "expanded" : "collapsed"
                }
                animate={
                  expandedSection === "education" ? "expanded" : "collapsed"
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="degree">
                    Highest Degree Earned{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="degree"
                    name="degree"
                    placeholder="Bachelor of Science"
                    className={formErrors.degree ? "border-red-500" : ""}
                  />
                  {formErrors.degree && (
                    <p className="text-red-500 text-sm">{formErrors.degree}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">
                    University/College <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="university"
                    name="university"
                    placeholder="Harvard University"
                    className={formErrors.university ? "border-red-500" : ""}
                  />
                  {formErrors.university && (
                    <p className="text-red-500 text-sm">
                      {formErrors.university}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">
                    Year of Graduation <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    placeholder="2023"
                    className={
                      formErrors.graduationYear ? "border-red-500" : ""
                    }
                  />
                  {formErrors.graduationYear && (
                    <p className="text-red-500 text-sm">
                      {formErrors.graduationYear}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">
                    Major/Field of Study <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="major"
                    name="major"
                    placeholder="Computer Science"
                    className={formErrors.major ? "border-red-500" : ""}
                  />
                  {formErrors.major && (
                    <p className="text-red-500 text-sm">{formErrors.major}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Work Experience */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("experience")}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Work Experience
                </h3>
                {expandedSection === "experience" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <Separator />

              <motion.div
                variants={sectionVariants}
                initial={
                  expandedSection === "experience" ? "expanded" : "collapsed"
                }
                animate={
                  expandedSection === "experience" ? "expanded" : "collapsed"
                }
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">
                      Previous Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Senior Developer"
                      className={formErrors.jobTitle ? "border-red-500" : ""}
                    />
                    {formErrors.jobTitle && (
                      <p className="text-red-500 text-sm">
                        {formErrors.jobTitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      className={formErrors.company ? "border-red-500" : ""}
                    />
                    {formErrors.company && (
                      <p className="text-red-500 text-sm">
                        {formErrors.company}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Duration <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="Jan 2020 - Dec 2022"
                      className={formErrors.duration ? "border-red-500" : ""}
                    />
                    {formErrors.duration && (
                      <p className="text-red-500 text-sm">
                        {formErrors.duration}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">
                    Responsibilities & Achievements{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    placeholder="Describe your key responsibilities and achievements in this role"
                    className={`min-h-[100px] ${
                      formErrors.responsibilities ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.responsibilities && (
                    <p className="text-red-500 text-sm">
                      {formErrors.responsibilities}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Skills & Certifications */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("skills")}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills & Certifications
                </h3>
                {expandedSection === "skills" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <Separator />

              <motion.div
                variants={sectionVariants}
                initial={
                  expandedSection === "skills" ? "expanded" : "collapsed"
                }
                animate={
                  expandedSection === "skills" ? "expanded" : "collapsed"
                }
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="technicalSkills">
                    Technical Skills <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="technicalSkills"
                    name="technicalSkills"
                    placeholder="JavaScript, React, Node.js, etc."
                    className={
                      formErrors.technicalSkills ? "border-red-500" : ""
                    }
                  />
                  {formErrors.technicalSkills && (
                    <p className="text-red-500 text-sm">
                      {formErrors.technicalSkills}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="softSkills">
                    Soft Skills <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="softSkills"
                    name="softSkills"
                    placeholder="Communication, Leadership, Problem-solving, etc."
                    className={formErrors.softSkills ? "border-red-500" : ""}
                  />
                  {formErrors.softSkills && (
                    <p className="text-red-500 text-sm">
                      {formErrors.softSkills}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications">
                    Relevant Certifications
                  </Label>
                  <Input
                    id="certifications"
                    name="certifications"
                    placeholder="AWS Certified Developer, Google Cloud Professional, etc."
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Resume Upload */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("resume")}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Resume Upload
                </h3>
                {expandedSection === "resume" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <Separator />

              <motion.div
                variants={sectionVariants}
                initial={
                  expandedSection === "resume" ? "expanded" : "collapsed"
                }
                animate={
                  expandedSection === "resume" ? "expanded" : "collapsed"
                }
              >
                <div className="space-y-2">
                  <Label htmlFor="resume">
                    Upload Resume <span className="text-red-500">*</span>
                  </Label>
                  <div
                    className={`border-2 ${
                      formErrors.resume ? "border-red-500" : "border-gray-200"
                    } border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative`}
                  >
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700">
                        {fileName
                          ? fileName
                          : "Drag and drop your resume or click to browse"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Supported formats: PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </div>
                  </div>
                  {formErrors.resume && (
                    <p className="text-red-500 text-sm">{formErrors.resume}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Form Errors Summary */}
            {Object.keys(formErrors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please fix the errors above before submitting the form.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 text-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
