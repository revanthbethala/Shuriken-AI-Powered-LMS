import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const verifyAuthToken = ClerkExpressWithAuth({
  apiKey: process.env.CLERK_PUBLISHABLE_KEY, 
});

export default verifyAuthToken;
