import { Link } from "expo-router";
import { Button, Text, View } from "react-native";
//  "../../modules/auth/screens/register/step-one"

export default function IndexScreen() {
  return (
    <View>
      <Text>Main screen</Text>
      <Link href="/profile" asChild>
        <Button title="Go to profile" />
      </Link>
      <Link href="/auth/register-step-one" asChild>
        <Button title="Register (RegisterStepOne)" />
      </Link>
    </View>
  )
}
