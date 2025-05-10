import { Link } from "expo-router";
import { Button, Text, View } from "react-native";
//  "../../modules/auth/screens/register/step-one"

export default function IndexScreen() {
  return (
    <View>
      <Text>Main screen</Text>
      <Link href="/users/profile" asChild>
        <Button title="Go to profile" />
      </Link>

      <Link href="/auth/register-step-one" asChild>
        <Button title="Register (RegisterStepOne)" />
      </Link>

      <Link href="/users/login" asChild>
        <Button title="Login" />
      </Link>
      
    </View>
  )
}
