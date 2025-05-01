import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View>
      <Text>Main screen</Text>
      <Link href="/profile" asChild>
        <Button title="Go to profile" />
      </Link>
      <Link href="/auth/login" asChild>
        <Button title="Login" />
      </Link>
    </View>
  )
}
