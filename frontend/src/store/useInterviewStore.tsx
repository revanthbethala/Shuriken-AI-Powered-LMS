import { create } from "zustand";

interface FormData {
  role: string;
  interviewType: string;
  experience: string;
  numberOfQuestions: number;
}

interface Errors {
  role: string;
  interviewType: string;
  experience: string;
  numberOfQuestions: string;
}

interface InterviewStore {
  formData: FormData;
  errors: Errors;
  setFormData: (field: keyof FormData, value: string | number) => void;
  setError: (field: keyof Errors, message: string) => void;
  resetErrors: () => void;
  score: number;
  updateScore: (newScore: number) => void;
}
export const useInterviewStore = create<InterviewStore>((set) => ({
  score: 0,
  formData: {
    role: "Python Developer",
    interviewType: "Technical",
    experience: "Fresher",
    numberOfQuestions: 10,
  },
  errors: {
    role: "",
    interviewType: "",
    experience: "",
    numberOfQuestions: "",
  },
  setFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),
  resetErrors: () =>
    set(() => ({
      errors: {
        role: "",
        interviewType: "",
        experience: "",
        numberOfQuestions: "",
      },
    })),
  updateScore: (score) => set({ score }),
}));
