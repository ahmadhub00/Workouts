import * as React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Text } from "@/components/Text";
/* import { Message, ChatRoom } from "@/utils/types";
import { database, appwriteConfig, client } from "@/utils/appwrite"; */
import { ID, Query } from "react-native-appwrite";
import { LegendList } from "@legendapp/list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { IconSymbol } from "@/components/IconSymbol";
import { useUser } from "@clerk/clerk-expo";
import { FlatList } from "react-native";
import { Secondary, Primary, Red } from "@/colors";
export default function ChatRoomScreen() {
  const { chat: chatRoomId } = useLocalSearchParams();
  const { user } = useUser();

  if (!chatRoomId) {
    return <Text>We couldn't find this chat room 🥲</Text>;
  }

  const [messageContent, setMessageContent] = React.useState("");
  const [chatRoom, setChatRoom] = React.useState<ChatRoom | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const headerHeight = Platform.OS === "ios" ? useHeaderHeight() : 0;
  const textInputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    handleFirstLoad();
  }, []);

  // Focus the text input when the component mounts
  React.useEffect(() => {
    if (!isLoading) {
      // Wait until loading is complete before focusing
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, [isLoading]);

  // Subscribe to messages
  React.useEffect(() => {
    // listen for updates on the chat room document
    const channel = `databases.${appwriteConfig.db}.collections.${appwriteConfig.col.chatRooms}.documents.${chatRoomId}`;

    const unsubscribe = client.subscribe(channel, () => {
      console.log("chat room updated");
      getMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  async function handleFirstLoad() {
    try {
      await getChatRoom();
      await getMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // get chat room info by chat id
  async function getChatRoom() {
    const document = await database.getDocument(
      appwriteConfig.db,
      appwriteConfig.col.chatRooms,
      chatRoomId as string
    );

    /**
     * First, we need to cast the document to unknown to avoid type errors
     * Then, we need to cast the document to ChatRoom to get the correct type 🤷‍♂️
     */
    setChatRoom(document as unknown as ChatRoom);
  }

  // get messages associated with chat id
  async function getMessages() {
    try {
      const { documents, total } = await database.listDocuments(
        appwriteConfig.db,
        appwriteConfig.col.message,
        [
          Query.equal("chatRoomId", chatRoomId),
          Query.limit(100),
          Query.orderDesc("$createdAt"),
        ]
      );

      // Reverse the documents array to display in chronological order
      documents.reverse();

      setMessages(documents as unknown as Message[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendMessage() {
    if (messageContent.trim() === "") return;

    const message = {
      content: messageContent,
      senderId: user?.id!,
      senderName: user?.fullName ?? "Anonymous",
      senderPhoto: user?.imageUrl ?? "",
      chatRoomId: chatRoomId as string,
    };

    try {
      // create a new message document
      await database.createDocument(
        appwriteConfig.db,
        appwriteConfig.col.message,
        ID.unique(),
        message
      );
      setMessageContent("");

      console.log("updating chat room", chatRoomId);
      // Update chat room updatedAt field
      await database.updateDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatRooms,
        chatRoomId as string,
        { $updatedAt: new Date().toISOString() }
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: chatRoom?.title,
          headerRight: () => (
            <Link
              href={{
                pathname: "/settings/[chat]",
                params: { chat: chatRoomId as string },
              }}
            >
              <IconSymbol name="gearshape" size={24} color={Primary} />
            </Link>
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={headerHeight}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => {
              const isSender = item.senderId === user?.id;
              return (
                <View
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 6,
                    maxWidth: "80%",
                    alignSelf: isSender ? "flex-end" : "flex-start",
                  }}
                >
                  {!isSender && (
                    <Image
                      source={{ uri: item.senderPhoto }}
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                    />
                  )}
                  <View
                    style={{
                      backgroundColor: isSender ? "#007AFF" : "#161616",
                      flex: 1,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "500", marginBottom: 4 }}>
                      {item.senderName}
                    </Text>
                    <Text>{item.content}</Text>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "right",
                      }}
                    >
                      {new Date(item.$createdAt!).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item?.$id ?? "unknown"}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd // Aligns to the end of the screen, so if there's only a few items there will be enough padding at the top to make them appear to be at the bottom.
            maintainScrollAtEnd // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainScrollAtEndThreshold={0.5} // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainVisibleContentPosition //Automatically adjust item positions when items are added/removed/resized above the viewport so that there is no shift in the visible content.
            estimatedItemSize={100} // estimated height of the item
            // getEstimatedItemSize={(info) => { // use if items are different known sizes
            //   console.log("info", info);
            // }}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: Secondary,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 20,
              marginBottom: 6,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              ref={textInputRef}
              placeholder="Type a message"
              style={{
                minHeight: 40,
                color: "white",
                flexShrink: 1, // prevent pushing the send button out of the screen
                flexGrow: 1, // allow the text input to grow keeping the send button to the right
                padding: 10,
              }}
              placeholderTextColor={"gray"}
              multiline
              value={messageContent}
              onChangeText={setMessageContent}
            />
            <Pressable
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSendMessage}
            >
              <IconSymbol
                name="paperplane"
                size={24}
                color={messageContent ? Primary : "gray"}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}