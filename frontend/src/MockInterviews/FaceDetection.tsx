import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import * as faceapi from "@vladmandic/face-api";

const FaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message, setMessage] = useState<string>("Initializing...");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [eyeContact, setEyeContact] = useState<boolean>(true);
  const [suggestion, setSuggestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        setMessage("Models Loaded. Starting Camera...");
        startVideo();
      } catch (error) {
        console.error("Error loading models:", error);
        setMessage("Failed to load models.");
      }
    };
    const startVideo = async () => {
      setIsLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setMessage("Camera Started...");
        detectFaces();
        setIsLoading(false);
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setMessage("Failed to access webcam.");
        setIsLoading(false);
      }
    };

    loadModels();
  }, []);

  const detectFaces = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const model = await blazeface.load();
    const faceapiOptions = new faceapi.TinyFaceDetectorOptions();
    const video = videoRef.current;

    const interval = setInterval(async () => {
      if (!video) return;

      const predictions = await model.estimateFaces(video, false);

      if (predictions.length === 0) {
        setMessage("No face detected! Please position yourself in the frame.");
        setEmotion(null);
        setEyeContact(false);
        setSuggestion("");
      } else if (predictions.length > 1) {
        setMessage(
          "Multiple faces detected! Please ensure only you are visible."
        );
        setEmotion(null);
        setEyeContact(false);
        setSuggestion("");
      } else {
        setMessage("Face detected!");

        const detections = await faceapi
          .detectSingleFace(video, faceapiOptions)
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections) {
          const expressions = detections.expressions;
          const topEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );
          setEmotion(topEmotion);
          provideFeedback(topEmotion);

          // Eye Contact Analysis
          checkEyeContact(detections.landmarks);
        }
        predictions.forEach((prediction) => {
          if (prediction.landmarks) {
            tf.dispose(prediction.landmarks);
          }
        });
      }
    }, 500);

    return () => clearInterval(interval);
  };

  const checkEyeContact = (landmarks: faceapi.FaceLandmarks68 | undefined) => {
    if (!landmarks) return;

    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose()?.[0];

    if (!leftEye || !rightEye || !nose) return;

    // Find the midpoints of both eyes
    const leftEyeMid = {
      x: (leftEye[0].x + leftEye[3].x) / 2,
      y: (leftEye[0].y + leftEye[3].y) / 2,
    };
    const rightEyeMid = {
      x: (rightEye[0].x + rightEye[3].x) / 2,
      y: (rightEye[0].y + rightEye[3].y) / 2,
    };

    // Compute the vector from the eyes to the nose
    const dx = (leftEyeMid.x + rightEyeMid.x) / 2 - nose.x;
    const dy = (leftEyeMid.y + rightEyeMid.y) / 2 - nose.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Define a threshold for gaze alignment (adjust based on testing)
    const threshold = 10;

    setEyeContact(distance < threshold);
  };

  const provideFeedback = (emotion: string) => {
    const suggestions: Record<string, string> = {
      happy: "Great! Keep smiling confidently.",
      neutral:
        "Good posture! Try adding a slight smile for a friendly impression.",
      sad: "Try to relax and maintain a slight smile. A positive attitude helps in interviews!",
      angry:
        "Stay calm and composed. Take a deep breath and maintain a professional expression.",
      disgusted:
        "Avoid showing displeasure. Keep a neutral or positive facial expression.",
      fearful:
        "Confidence is key! Take a deep breath and relax your facial muscles.",
      surprised:
        "Surprise can be good, but keep it controlled. Maintain eye contact and stay composed.",
    };
    setSuggestion(suggestions[emotion] || "");
  };

  const getEmotionColor = (emotion: string | null) => {
    if (!emotion) return "bg-gray-200 text-gray-700";

    const colors: Record<string, string> = {
      happy: "bg-green-100 text-green-800 border-green-300",
      neutral: "bg-blue-100 text-blue-800 border-blue-300",
      sad: "bg-indigo-100 text-indigo-800 border-indigo-300",
      angry: "bg-red-100 text-red-800 border-red-300",
      disgusted: "bg-purple-100 text-purple-800 border-purple-300",
      fearful: "bg-amber-100 text-amber-800 border-amber-300",
      surprised: "bg-cyan-100 text-cyan-800 border-cyan-300",
    };

    return colors[emotion] || "bg-gray-200 text-gray-700";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="w-full max-w-2xl shadow-xl border border-slate-200 overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <motion.div
            className="flex items-center justify-center p-3 rounded-lg bg-slate-50 border border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              {message.includes("no") ? (
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              ) : message.includes("detected") ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="h-5 w-5 text-blue-500 mr-2" />
                </motion.div>
              )}
              <p className="text-sm font-medium text-slate-700">{message}</p>
            </div>
          </motion.div>

          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-inner border border-slate-300">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="h-10 w-10 text-white" />
                </motion.div>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            ></video>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          {emotion && (
            <motion.div
              className="space-y-4 p-4 rounded-lg bg-white border border-slate-200 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-1">
                    Detected Emotion
                  </span>
                  <Badge
                    className={`${getEmotionColor(
                      emotion
                    )} capitalize px-3 py-1 text-sm font-medium`}
                  >
                    {emotion}
                  </Badge>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-1">
                    Eye Contact
                  </span>
                  <div className="flex flex-row items-center">
                    <Badge
                      variant={eyeContact ? "default" : "destructive"}
                      className="px-3 py-1 text-sm font-medium"
                    >
                      {eyeContact ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />{" "}
                          Maintained
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <XCircle className="h-3.5 w-3.5 mr-1" /> Not
                          Maintained
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              {suggestion && (
                <motion.div
                  className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-amber-800 flex items-start">
                    <span className="text-amber-500 mr-2 text-lg">💡</span>
                    <span>{suggestion}</span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceDetection;
