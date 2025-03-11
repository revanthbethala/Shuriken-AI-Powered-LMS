import { useNavigate } from "react-router";
import { create } from "zustand";

interface FormData {
  username: string;
  email: string;
  age: string;
  study: string;
  experience: string;
  domain1: string;
  domain2: string;
  isValid: boolean;
}

interface Errors {
  username?: string;
  email?: string;
  age?: string;
  study?: string;
  experience?: string;
  domain1?: string;
  domain2?: string;
}

interface UserPreferencesState {
  formData: FormData;
  errors: Errors;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

const studies = [
  "PhD",
  "Graduation",
  "Under-graduation",
  "Diploma",
  "Intermediate",
  "SSC",
];
const experience = [
  "Newbie",
  "Beginner",
  "Intermediate",
  "Expert",
  "Professional",
];
const useUserPreferencesStore = create<UserPreferencesState>((set) => ({
  formData: {
    username: "",
    email: "",
    age: "",
    study: "Graduation",
    experience: "Newbie",
    domain1: "frontend",
    domain2: "data science",
    isValid: false,
  },
  errors: {},

  handleChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleSubmit: (e) => {
    e.preventDefault();
    const { username, email, age, study, experience, domain1, domain2 } =
      useUserPreferencesStore.getState().formData;
    let formErrors: Errors = {};

    if (!username) formErrors.username = "Full Name is required";
    if (!email) formErrors.email = "Email is required";
    if (!age) formErrors.age = "Age is required";
    if (age && (Number(age) < 10 || Number(age) > 100))
      formErrors.age = "Age must be between 10 and 100";
    if (!study) formErrors.study = "Education level is required";
    if (!experience) formErrors.experience = "Experience level is required";
    if (!domain1) formErrors.domain1 = "Domain 1 is required";
    if (!domain2) formErrors.domain2 = "Domain 2 is required";

    set({ errors: formErrors });
    if (Object.keys(formErrors).length === 0) {
      console.log(useUserPreferencesStore.getState().formData);
      set((state) => ({
        formData: { ...state.formData, isValid: true },
      }));
    }
  },

  resetForm: () =>
    set({
      formData: {
        username: "",
        email: "",
        age: "",
        study: "",
        experience: "",
        domain1: "",
        domain2: "",
        isValid: false,
      },
      errors: {},
    }),
}));

export default useUserPreferencesStore;
