import { useState } from "react";
import axios from "axios";
import GetUserId from "@/helperFunctions/GetUserId";
import { useParams } from "react-router";
import useGet from "@/myComponents/useGet";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const userId = GetUserId();
  const { courseId } = useParams();
  const { data: courses, isLoading, error } = useGet(`courses/${courseId}`);
  const courseData = courses?.course;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/payments/checkout/create-checkout-session",
        { userId, courseId }
      );
      if (data.success) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing payment");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg shadow">
          Error loading course data
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 space-y-4">
              <img
                src={courseData?.courseThumbnail}
                alt={courseData?.courseTitle}
                className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-lg"
              />
              <CardTitle className="text-2xl font-bold text-gray-900">
                {courseData?.courseTitle}
              </CardTitle>
              <p className="text-gray-600">{courseData?.subTitle}</p>
              <div
                className="prose prose-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: courseData?.description }}
              ></div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span>Level: {courseData?.courseLevel}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 text-white">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold">
                    ₹{courseData?.coursePrice}
                  </h3>
                  <p className="text-blue-100">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-200" />
                    <p className="text-sm">Secure payment with Stripe</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-200" />
                    <p className="text-sm">Instant access after payment</p>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full h-12 text-lg bg-white text-blue-700 hover:bg-blue-50 transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin w-5 h-5" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      Pay Securely
                    </div>
                  )}
                </Button>

                <p className="text-center text-sm text-blue-100">
                  By proceeding, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Checkout;
