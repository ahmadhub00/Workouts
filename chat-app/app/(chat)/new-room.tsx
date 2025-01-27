import {Text} from "@/components/Text";
import {View} from "react-native";

export default function newRoom() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>New Room</Text>
    </View>
  );
}