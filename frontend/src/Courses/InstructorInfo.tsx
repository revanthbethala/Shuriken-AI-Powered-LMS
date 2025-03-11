import useGet from "@/myComponents/useGet";
import { useParams } from "react-router";

const InstructorInfo = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGet(`user/getUserById/${id}`);

  if (isLoading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">
        Error loading instructor info.
      </p>
    );

  const user = data?.user;

  const testimonials = [
    {
      name: "Ch. Murali Krishna",
      position: "HOD, NRI Institute of Technology",
      text: "He consistently demonstrates a strong grasp of web and mobile development. His dedication to learning and applying new technologies is impressive.",
    },
    {
      name: "Dr. G. Adi Lakshmi",
      position: "Professor, NRI Institute of Technology",
      text: "He has a unique ability to simplify complex concepts. His Python tutoring sessions have greatly benefited his peers.",
    },
    {
      name: "Karri Sripathi Rao",
      position: "Classmate",
      text: "Working with He on our group projects was a game changer. His coding skills and creativity brought our ideas to life.",
    },
    {
      name: "Lohit",
      position: "Fellow Developer",
      text: "He is a talented developer. His work on our mobile app showcased his skill in delivering user-friendly designs.",
    },
    {
      name: "Ayyala Hari",
      position: "Project Partner",
      text: "He's support and knowledge made our project successful. He is always willing to help and share his expertise.",
    },
    {
      name: "Amrutha",
      position: "Professor, NRI Institute of Technology",
      text: "He's enthusiasm for coding is infectious. His projects showcase his ability to blend creativity with technical skills.",
    },
  ];

  // Function to handle email button click
  const handleMessageClick = () => {
    window.location.href = `mailto:${user?.email}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-200 mt-16">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Instructor Information
      </h2>

      {/* Profile Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full shadow-lg border-2 border-indigo-500"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {user?.fullName}
            </p>
            <p className="text-md text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 shadow-sm rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Courses</h3>
          <p className="text-lg text-indigo-600">{user?.courses.length}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleMessageClick}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Message Instructor
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Testimonials</h3>
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">
                - {testimonial.name}, {testimonial.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
