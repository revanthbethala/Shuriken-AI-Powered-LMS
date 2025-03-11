import { BASE_URL } from "@/data";
import GetUserId from "@/helperFunctions/GetUserId";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CompanyTable = () => {
  const userId = GetUserId();
  console.log(userId)
  const [isLoading, setIsLoading] = useState(true);
  const CompanyHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_URL}/company/get`,
        userId,
        {
          withCredentials: true,
        }
      );
      toast.success("Company updated successfully!");
      console.log(res);
    } catch (err) {
      toast.error("Error updating company");
      console.error("Error updating company:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={CompanyHandler}>Get Company Details</button>
    </div>
  );
};

export default CompanyTable;
