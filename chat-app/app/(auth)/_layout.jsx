/* import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn } = useUser();

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
  
 */
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return null;
  }
  
  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }}
      />
    </Stack>
  );
}