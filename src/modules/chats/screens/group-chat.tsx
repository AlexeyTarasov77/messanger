import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { GroupMessagesChat } from "./group-messages-chat";

export function GroupChatScreen() {
  const params = useLocalSearchParams();
  return (
    <View>
        <GroupMessagesChat/>
    </View>
  );
}
