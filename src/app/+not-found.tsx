import { Text, View } from "react-native";

export default function NotFoundScreen() {
  console.log("not found");
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, color: "#000" }}>Not Found</Text>
        </View>
    );
}
