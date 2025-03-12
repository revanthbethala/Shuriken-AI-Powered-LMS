import React, { useState, useEffect } from "react";
import axios from "axios";
import { Globe } from "lucide-react"; // Globe icon from Lucide React

const GoogleTranslate = () => {
  const [language, setLanguage] = useState("en"); // Default: English
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const apiKey = "b227f7b21dmshe5456f4842e2431p157710jsn6d20221d25cc"; // Replace with your actual API key

  // Extracts visible text from the page
  const extractText = () => {
    const elements = document.body.querySelectorAll("*:not(script):not(style)");
    const texts = [];
    const originalTexts = [];
    elements?.forEach((element, index) => {
      if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
        const trimmedText = element.textContent.trim();
        if (trimmedText) {
          texts.push(trimmedText);
          originalTexts.push({ index, element });
        }
      }
    });

    return { texts, originalTexts };
  };

  // Calls API to translate extracted text
  const translatePage = async (selectedLanguage) => {
    const { texts, originalTexts } = extractText();

    if (texts.length === 0) {
      console.warn("No translatable text found.");
      return;
    }

    const options = {
      method: "POST",
      url: "https://ai-translate.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "ai-translate.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        texts: texts,
        sl: "auto",
        tl: selectedLanguage,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data.texts);

      if (!response.data || !Array.isArray(response.data.texts)) {
        console.error("Invalid API response format:", response.data);
        return;
      }

      response.data.texts.forEach((translatedText, i) => {
        if (originalTexts[i] && originalTexts[i].element) {
          originalTexts[i].element.innerText = translatedText;
        }
      });
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  // Automatically translate when language is changed
  useEffect(() => {
      translatePage(language);
  }, [language]);

  return (
    <div className="relative">
      {/* Globe Icon */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <Globe className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 z-10 w-40 bg-white border border-gray-300 shadow-lg rounded-lg">
          <ul className="py-2 text-sm text-gray-700">
            {[
              { code: "en", label: "🇺🇸 English" },
              { code: "zh", label: "🇨🇳 Chinese" },
              { code: "fr", label: "🇫🇷 French" },
              { code: "es", label: "🇪🇸 Spanish" },
              { code: "de", label: "🇩🇪 German" },
              { code: "hi", label: "🇮🇳 Hindi" },
              { code: "ta", label: "🇮🇳 Tamil" },
              { code: "te", label: "🇮🇳 Telugu" },
              { code: "ml", label: "🇮🇳 Malayalam" },
              { code: "mr", label: "🇮🇳 Marathi" },
              { code: "bn", label: "🇮🇳 Bengali" },
              { code: "gu", label: "🇮🇳 Gujarati" },
              { code: "kn", label: "🇮🇳 Kannada" },
              { code: "pa", label: "🇮🇳 Punjabi" },
              { code: "ur", label: "🇮🇳 Urdu" },
            ].map(({ code, label }) => (
              <li key={code}>
                <button
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    language === code ? "font-semibold text-blue-600" : ""
                  }`}
                  onClick={() => {
                    setLanguage(code);
                    setDropdownOpen(false);
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
