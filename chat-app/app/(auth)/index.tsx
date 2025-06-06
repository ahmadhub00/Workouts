import * as React from "react";
import { View, Image, SafeAreaView } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSSO,
  useUser,
} from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Redirect } from "expo-router";

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { startSSOFlow } = useSSO();
  const { user, isSignedIn, isLoaded } = useUser(); 
  const { signIn, setActive } = useSignIn();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  if (isLoaded && isSignedIn) {
    return <Redirect href="/(chat)" />;
  }
  const handleSignInWithGoogle = React.useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // Defaults to current path
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

 /*  const handleSignInWithPasskey = async () => {
    try {
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: "discoverable",
      });

      if (signInAttempt?.status === "complete") {
        if (setActive !== undefined) {
          await setActive({ session: signInAttempt.createdSessionId });
        }
      } else {
        
        console.error(JSON.stringify(signInAttempt, null, 2));
    } 
  } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.error(error);
      }
    }
  }; */

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ flex: 0.1 }} />
        <View style={{ gap: 20, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            Modern Chat App
          </Text>
          <Text> The best chat app</Text>

          {errors.map((error) => (
            <Text key={error.code}>{error.code}</Text>
          ))}
        </View>
        <View style={{ flex: 1 }} /> 
         {/* <Button
          style={{
            marginBottom: 20,
          }}
          onPress={handleSignInWithPasskey}
        >
           <Text style={{ color: "white", fontWeight: "500" }}>
            Sign in with Passkey
          </Text>
          
        </Button> */} 
        <Button
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 30,
          }}
          onPress={handleSignInWithGoogle}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "black", fontWeight: "500" }}>
            Sign in with Google
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
 
