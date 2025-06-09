import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export function ChatScreen() {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>Chat {params.id}</Text>
    </View>
  );
}
