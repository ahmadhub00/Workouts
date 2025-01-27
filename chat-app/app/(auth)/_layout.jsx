import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useUser();
  
  // Wait for auth to load
  if (!isLoaded) {
    return null;
  }
  
  // If signed in, redirect to chat
  if (isSignedIn) {
    return <Redirect href="/(chat)"  />;
  }

  return (
    <Stack>
      <Stack.Screen name="index"
       options={{ headerShown: false }} 
       />
    </Stack>
  );
}
  
 