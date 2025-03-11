import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/data";
import RichTextEditor from "@/myComponents/RichTextEditor";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CompanyInput {
  name: string;
  website: string;
  description: string;
  location: string;
  logo?: File | null;
}

const EditCompany = () => {
  const [input, setInput] = useState<CompanyInput>({
    name: "",
    description: "",
    website: "",
    location: "",
    // logo: null,
  });
  // const [previewProfile, setPreviewProfile] = useState<string>("");
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetchCompanyData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${BASE_URL}/company/${companyId}`,
  //         { withCredentials: true }
  //       );
  //       setInput({
  //         name: data.name || "",
  //         website: data.website || "",
  //         description: data.description || "",
  //         location: data.location || "",
  //       });
  //       // if (data.logo) setPreviewProfile(data.logo); // Assuming the API returns the logo URL
  //     } catch (err) {
  //       toast.error("Failed to load company details");
  //       console.error("Error fetching company details:", err);
  //     }
  //   };

  //   if (companyId) fetchCompanyData();
  // }, [companyId]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // const selectProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setInput((prev) => ({ ...prev, logo: file }));
  //     const fileReader = new FileReader();
  //     fileReader.onloadend = () => setPreviewProfile(fileReader.result as string);
  //     fileReader.readAsDataURL(file);
  //   }
  // };

  const updateCompanyHandler = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("website", input.website);
      formData.append("description", input.description);
      formData.append("location", input.location);
      // if (input.logo) formData.append("logo", input.logo);
      const res = await axios.put(
        `${BASE_URL}/company/update/${companyId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Company updated successfully!");
      setIsUpdated(res?.data?.success);
    } catch (err) {
      toast.error("Error updating company");
      console.error("Error updating company:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <Card className="shadow-lg rounded-lg p-6 bg-white border border-gray-200">
        <CardContent className="mt-6 space-y-6">
          <h3 className="font-semibold text-xl text-center">
            Update Company Information
          </h3>
          {/* <div>
            <Label>Company Logo</Label>
            <Input type="file" onChange={selectProfile} accept="image/*" />
            {previewProfile && (
              <img
                src={previewProfile}
                className="mt-2 max-w-[200px] rounded-md"
                alt="Company Logo"
              />
            )}
          </div> */}
          <div>
            <Label>Company Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="Enter website URL"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="Enter company location"
            />
          </div>
          <div className="flex gap-4 mt-6 justify-between">
            <Button
              onClick={() => navigate("/recruiter/companies")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={updateCompanyHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />} Save
            </Button>
          </div>
        </CardContent>
        {isUpdated && (
          <CardFooter className="flex items-center justify-center">
            <NavLink to={`/recruiter/${companyId}/createJob`}>
              <Button variant={"outline"}>Create Jobs</Button>
            </NavLink>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default EditCompany;
