import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  recommended_job: string;
  skills: string[];
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume file.");
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload. Server responded with ${response.status}`);
      }

      const result: ResumeData = await response.json();
      setData(result);
    } catch (error) {
      console.error("Upload failed", error);
      setError("Error uploading resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-4 py-10">
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI-Powered Resume Analyzer
      </motion.h1>

      <Card className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-2xl shadow-md">
        <CardContent className="flex flex-col items-center space-y-6">
          {/* File Upload Area */}
          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition">
            <Upload className="w-12 h-12 text-gray-600 mb-2" />
            <span className="text-gray-700 font-medium">
              {file ? file.name : "Click to select or drag a file"}
            </span>
            <Input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white transition font-semibold text-lg py-3 rounded-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Uploading...</span>
              </span>
            ) : (
              "Upload Resume"
            )}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </CardContent>
      </Card>

      {/* Extracted Information Display */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full max-w-lg bg-white border border-gray-300 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="mr-2 text-blue-500" />
            Extracted Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong className="text-gray-900">Name:</strong> {data.name}
            </p>
            <p>
              <strong className="text-gray-900">Email:</strong> {data.email}
            </p>
            <p>
              <strong className="text-gray-900">Phone:</strong> {data.phone}
            </p>
            <p>
              <strong className="text-gray-900">Recommended Job:</strong> {data.recommended_job}
            </p>
            <p>
              <strong className="text-gray-900">Skills:</strong> {data.skills?.join(", ")}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
