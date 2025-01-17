import { View } from "react-native";
import {Text} from"@/components/Text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Auth</Text>
    </SafeAreaView>
  );
}
