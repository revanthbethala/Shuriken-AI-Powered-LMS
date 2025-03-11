import {
  BarChart,
  Brain,
  Code,
  Database,
  Globe,
  Lock,
  Server,
  Smartphone,
} from "lucide-react";
import hero from "./assets/hero.png";
import logo from "./assets/logo.png";
import userPreferences from "./assets/userPreferences.png";
import resume from "./assets/resume.png";
import quiz from "./assets/quiz.png";
import badge from "./assets/badge.png";
import border from "./assets/border.png";
import jobsImg from "./assets/jobsImg.png";
import analyzer from "./assets/analyzer.png";
import fullStar from "./assets/fullStar.svg";

const categories = [
  { name: "Data Structures", icon: <Database /> },
  { name: "Algorithms", icon: <Code /> },
  { name: "Web Development", icon: <Globe /> },
  { name: "Database Management", icon: <Server /> },
  { name: "Machine Learning", icon: <BarChart /> },
  { name: "Cybersecurity", icon: <Lock /> },
  { name: "Artificial Intelligence", icon: <Brain /> },
  { name: "Mobile App Development", icon: <Smartphone /> },
];
export const BASE_URL="http://localhost:8000/api/v1"
export {
  categories,
  jobsImg,
  hero,
  logo,
  border,
  badge,
  analyzer,
  userPreferences,
  resume,
  quiz,
  fullStar
};
