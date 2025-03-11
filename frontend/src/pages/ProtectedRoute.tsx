import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    navigate("/login"); // Redirect to login if not signed in
    return null; // Don't render children if not signed in
  }

  return <>{children}</>; // Render children if signed in
}

export default ProtectedRoute;
