import { useUser } from "@clerk/clerk-expo";
import { Link,Redirect, Stack } from "expo-router";
import {Image} from "react-native";

export default function ChatLayout() {
   const { isSignedIn, isLoaded } = useUser();
   const {user } = useUser();
  // Wait for auth to load
  if (!isLoaded) {
    return null;
  }
  // If signed in, redirect to auth section
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  
  return ( 
  <Stack >
    <Stack.Screen name="index"
     options={{ headerLargeTitle: true,
      headerTitle: "Chat Rooms",
      headerLeft: () => (
            <Link href="/profile">
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />
            </Link>
          ),
          /* headerRight: () => (
            <Link href="/new-room">
              <IconSymbol name="plus" />
            </Link>
          ), */
        }}
      />
    <Stack.Screen name="profile" 
    options={{ presentation: "modal",
          headerTitle: "New Chat Room",
          /* headerLeft: () => (
            <Link href="/" dismissTo>
              <IconSymbol name="chevron.left" />
            </Link>
          ), */
           }} />
      <Stack.Screen name="new-room" 
    options={{ presentation: "modal",
          headerTitle: "New Chat Room",
          /* headerLeft: () => (
            <Link href="/" dismissTo>
              <IconSymbol name="chevron.left" />
            </Link>
          ), */
           }} />
   </Stack>
  );
}
