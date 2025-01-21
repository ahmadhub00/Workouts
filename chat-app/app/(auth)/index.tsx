import { View, Image, SafeAreaView } from "react-native";
import {Text} from"@/components/Text";
import {Button} from "@/components/Button";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        
      }}
    >
      <View style={{ flex:0.1}}/>
      <View style={{ gap: 20, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            Modern Chat App
          </Text>
          <Text > The best chat app</Text>
        </View>
        <Button style={{
            marginBottom: 20,
          }}
        > Sign in with passkey</Button>
        <Button
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 30,
          }}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <Text style={{ color: "black", fontWeight: "500" }}>
            Sign in with Google
          </Text>
        </Button>
    </SafeAreaView>
  );
}
