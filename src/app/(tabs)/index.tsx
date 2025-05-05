import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View>
      <Text>Main screen</Text>
      <Link href="/users/profile" asChild>
        <Button title="Go to profile" />
      </Link>
      <Link href="/users/login" asChild>
        <Button title="Login" />
      </Link>
      <Link href="/users/register" asChild>
        <Button title="Register" />
      </Link>
    </View>
  )
}

