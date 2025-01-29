/* import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { appwriteConfig, database } from "@/utils/appwrite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function ChatSettings() {
  const { chat: chatRoomId } = useLocalSearchParams();
  const router = useRouter();

  if (!chatRoomId) {
    return <Text>We couldn't find this chat room 🥲</Text>;
  }

  async function handleDeleteChat() {
    try {
      await database.deleteDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatRooms,
        chatRoomId as string
      );
      router.replace("/(chat)");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Chat Settings</Text>
      <Button onPress={handleDeleteChat}>Delete Chat</Button>
    </View>
  );
} */
import {Text} from "@/components/Text";
import {View} from "react-native";
export default function ChatSettings() {
  return (
    <View>
    <Text>settings
    </Text>
    </View>
  );
}