import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";

const key = import.meta.env.VITE_APP_GEMINI_KEY;

export default function useGemini(content) {
  const [data, setData] = useState<any>(null); // Replace 'any' with the actual data type
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetching() {
      try {
        setIsLoading(true);
        setError(null);
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(content);
        const res = await result.response.text();
        let text;
        try {
          text = res?.slice(7, res.length - 4);
          text = JSON.parse(text);
          console.log("After Parsing", text);
        } catch (err) {
          console.log(err);
          setError("Error parsing JSON");
          fetching();
        }
        setData(text);
      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    fetching();
  }, [content]);

  return { data, isLoading, error };
}
