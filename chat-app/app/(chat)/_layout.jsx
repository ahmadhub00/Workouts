import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function ChatLayout() {
   const { isSignedIn, isLoaded } = useUser();
  
  // Wait for auth to load
  if (!isLoaded) {
    return null;
  }
  
  // If signed in, redirect to auth section
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  // Show login screen for non-signed in users
  return <Stack >
    <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>;
}
