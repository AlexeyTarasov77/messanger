import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function MyPostsScreen() {
    return (
        <View>
            <Text>My posts</Text>
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
    );
}
