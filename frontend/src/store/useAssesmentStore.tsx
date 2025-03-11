import { create } from "zustand";

// Define types for the form data and errors
interface FormData {
  category: string;
  difficulty: string;
  timeLimit: number;
  numberOfQuestions: number;
  isSubmitted: boolean;
}

interface Errors {
  category: string;
  difficulty: string;
  timeLimit: string;
  numberOfQuestions: string;
}

// Define the store's actions and state
interface AssessmentStore {
  formData: FormData;
  errors: Errors;
  setFormData: (field: keyof FormData, value: string | number) => void;
  setError: (field: keyof Errors, message: string) => void;
  resetErrors: () => void;
}

// Create the Zustand store with type annotations
export const useAssessmentStore = create<AssessmentStore>((set) => ({
  formData: {
    category: "Web Development",
    difficulty: "Easy",
    timeLimit: 10,
    numberOfQuestions: 10,
    isSubmitted: false,
  },
  errors: {
    category: "",
    difficulty: "",
    timeLimit: "",
    numberOfQuestions: "",
  },
  setFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value, isSubmitted: true },
    })),
  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),
  resetErrors: () =>
    set(() => ({
      errors: {
        category: "",
        difficulty: "",
        timeLimit: "",
        numberOfQuestions: "",
      },
    })),
}));
