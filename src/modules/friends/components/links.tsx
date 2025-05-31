import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export function Links() {
    const router = useRouter();

    return (
        <View className="flex-row justify-around py-8 bg-mainBg">
            <TouchableOpacity onPress={() => router.push("/friends/main")}>
                <Text className="font-medium">Головна</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/friends/requests")}>
                <Text className="font-medium">Запити</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/friends/recommendations")}>
                <Text className="font-medium">Рекомендації</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/friends/all-friends")}>
                <Text className="font-medium">Всі друзі</Text>
            </TouchableOpacity>
        </View>
    );
}