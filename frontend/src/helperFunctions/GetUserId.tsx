import { useUser } from "@clerk/clerk-react";

export default function GetUserId() {
  const { user, isLoaded, isSignedIn } = useUser();
  const userId: string | undefined = user?.id;
  return (isLoaded && isSignedIn )&& userId;
}
