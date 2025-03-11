import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGet from "@/myComponents/useGet";
import Loading from "@/pages/Loading";
import {
  BadgeInfo,
  Lock,
  PlayCircle,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const CourseDetails = () => {
  const { user } = useUser();
  const userId = user?.id;
  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const { data: res, isLoading, error } = useGet(`courses/${courseId}`);
  const { data: ratingData } = useGet(`courseRating/course-rating/${courseId}`);
  const { data: reviewsData } = useGet(
    `courseRating/course-reviews/${courseId}`
  );
  const reviews = reviewsData?.reviews;
  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error loading course.</p>
    );
  const { course } = res || {};
  const lectures = course?.lectures || [];

  // const handleContinueCourse = async () => {
  //   const amount = course?.coursePrice;
  //   const res = await axios.post(
  //     `${BASE_URL}/payments/shuriPay`,
  //     JSON.stringify({ userId, courseId, amount }),
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     }
  //   );
  //   navigate(`../course-progress/${courseId}`);
  // };

  const getStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };
  const handleSubmitRating = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/courseRating/rate-course`,
        {
          course_id: courseId,
          user_id: userId,
          rating: userRating,
          review: userReview,
        }
      );
      if (response.status === 201) console.log(response);
      if (response.data.success) {
        alert("Thank you for your review!");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-3">
        <div className="pl-3">
          <button
            onClick={() => navigate(-1)}
            className=" rounded-full border flex items-center font-bold gap-1 p-2"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2 capitalize">
            {course?.courseTitle}
          </h1>
          <p className="text-xl mb-4">{course?.subTitle}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <p className="flex items-center">
              <BadgeInfo className="mr-2 h-4 w-4" />
              Last updated {course?.updatedAt?.split("T")[0] || "N/A"}
            </p>
            <p className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              {course?.enrolledStudents?.length || 0} students enrolled
            </p>
            <NavLink
              to={`/courses/${course?.creator._id}/instructorInfo`}
              className="flex items-center "
            >
              Created by {course?.creator?.fullName || "Unknown"}
            </NavLink>
            <p className="flex items-center">
              <Star className="mr-2 h-4 w-4" />
              {ratingData?.averageRating} ({ratingData?.totalRatings} students)
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: course?.description || "",
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{lectures.length} lectures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lectures.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600">
                        {lecture.isAccessible ? (
                          <PlayCircle className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </span>
                      <p className="font-medium">
                        {lecture.lectureTitle || `Lecture ${idx + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="mt-8 border border-gray-200 shadow-sm rounded-xl">
              <CardHeader className="bg-gray-100 px-6 py-4 rounded-t-xl">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Reviews
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {reviews?.length} reviews (Average Rating:{" "}
                  <span className="font-medium text-gray-900">
                    {ratingData?.averageRating}
                  </span>
                  )
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {reviews?.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white shadow-md rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-lg">
                        {review.user_name || "Anonymous"}
                      </p>
                    </div>
                    <p className="flex gap-1 my-2">{getStars(review.rating)}</p>
                    <p className="text-base text-gray-700 mt-2">
                      {review.review}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Rated on: {review.created_at}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 lg:mt-0">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="w-fit h-fit">
                  <img src={course?.courseThumbnail} alt="preview" />
                </div>
                <h2 className="text-2xl font-bold my-4">
                  ₹{course?.coursePrice}
                </h2>

                {/* Star Rating Field */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Rate this course:</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">
                      Rate this course:
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className={`h-6 w-6 ${
                            userRating >= star
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border-2 border-gray-200 rounded-lg"
                    rows={3}
                    placeholder="Write a review..."
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleSubmitRating}
                  variant="default"
                >
                  Submit Rating
                </Button>

                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={() => navigate(`/courses/checkout/${courseId}`)}
                  variant="default"
                >
                  Purchase Course
                </Button>
                <NavLink to={`/courses/course-progress/${courseId}`}>
                  <Button className="w-full mb-4" size="lg" variant="default">
                    Go to Course
                  </Button>
                </NavLink>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
