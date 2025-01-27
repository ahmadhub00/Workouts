import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn, isLoaded } = useUser();
  
  // Wait for user data to load
  if (!isLoaded) {
    return null; // or loading spinner
  }
  
  // Route based on auth status
  if (isSignedIn) {
    return <Redirect href="/(chat)" />;
  } else {
    return <Redirect href="/(auth)" />;
  }
}