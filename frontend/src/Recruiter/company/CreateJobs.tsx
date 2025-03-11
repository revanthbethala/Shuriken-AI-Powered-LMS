"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { BASE_URL } from "@/data"
import { toast } from "react-toastify"
import GetUserId from "@/helperFunctions/GetUserId"
import { useParams } from "react-router"
import { Briefcase, MapPin, Building, DollarSign, Clock, Award, Users } from "lucide-react"

interface FormData {
  title: string
  company: string
  location: string
  description: string
  requirements: string
  salary: number | null
  jobtype: string
  experience: number | null
  positions: number | null
}

interface Errors {
  title?: string
  company?: string
  location?: string
  description?: string
  requirements?: string
  salary?: string
  jobtype?: string
  experience?: string
  positions?: string
}

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
]

export default function CreateJobs() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    salary: null,
    jobtype: "",
    experience: null,
    positions: null,
  })

  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const userId = GetUserId()
  const { companyId } = useParams()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "salary" || name === "experience" || name === "positions"
          ? value === ""
            ? null
            : Number(value)
          : value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validate = (): Errors => {
    const newErrors: Errors = {}
    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.location.trim()) newErrors.location = "Job location is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.requirements.trim()) newErrors.requirements = "At least one requirement is required"
    if (!formData.salary) newErrors.salary = "Salary is required"
    if (!formData.jobtype.trim()) newErrors.jobtype = "Job type is required"
    if (!formData.experience) newErrors.experience = "Experience level is required"
    if (!formData.positions) newErrors.positions = "Number of positions is required"
    return newErrors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Please fix the errors in the form")
      return
    }
    setIsSubmitting(true)
    const postingData = { ...formData, userId, companyId }

    try {
      const res = await axios.post(`${BASE_URL}/job/post`, postingData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      toast.success("Job posted successfully!")
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        salary: null,
        jobtype: "",
        experience: null,
        positions: null,
      })
      setErrors({})
      console.log(res)
    } catch (err) {
      toast.error("Error posting job")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-5 py-1">
      <Card className=" mx-auto shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Briefcase className="mr-2 h-6 w-6" />
            Create Job Posting
          </CardTitle>
          <CardDescription>Fill out the form below to create a new job posting for your company</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Developer"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Inc."
                    className={errors.company ? "border-red-500" : ""}
                  />
                  {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Job Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, New York, NY"
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobtype" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Job Type
                  </Label>
                  <Select value={formData.jobtype} onValueChange={(value) => handleSelectChange("jobtype", value)}>
                    <SelectTrigger className={errors.jobtype ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.jobtype && <p className="text-sm text-red-500">{errors.jobtype}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary" className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Salary
                  </Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary === null ? "" : formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. 80000"
                    className={errors.salary ? "border-red-500" : ""}
                  />
                  {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                  <p className="text-xs text-muted-foreground">Annual salary in USD</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Experience (years)
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience === null ? "" : formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    className={errors.experience ? "border-red-500" : ""}
                  />
                  {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="positions" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Number of Positions
                  </Label>
                  <Input
                    id="positions"
                    name="positions"
                    type="number"
                    value={formData.positions === null ? "" : formData.positions}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className={errors.positions ? "border-red-500" : ""}
                  />
                  {errors.positions && <p className="text-sm text-red-500">{errors.positions}</p>}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Job Description & Requirements</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the job role, responsibilities, and company information..."
                    className={`min-h-[50px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  <p className="text-xs text-muted-foreground">
                    Provide a detailed description of the job role and responsibilities
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Job Requirements</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="List the skills, qualifications, and experience required..."
                    className={`min-h-[50px] ${errors.requirements ? "border-red-500" : ""}`}
                  />
                  {errors.requirements && <p className="text-sm text-red-500">{errors.requirements}</p>}
                  <p className="text-xs text-muted-foreground">
                    List the skills, qualifications, and experience required for this position
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full md:w-auto px-8" disabled={isSubmitting} size="lg">
                {isSubmitting ? "Submitting..." : "Create Job Posting"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

