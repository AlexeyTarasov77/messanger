import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export function Profile() {
    return (
        <LinearGradient
            colors={["#77B5BF", "#7D88AA"]}
            start={{ x: 0, y: 0 }}
            // end={{ x: 1, y: 1 }}
            className="flex-1"

        >
            <View>
                <Text className="text-white text-2xl font-semibold">
                    Name
                </Text>
                <Text className="text-white text-2xl font-semibold">
                    У мережі
                </Text>
            </View>

            <View className="mt-4">
                <View>
                    <Text className="text-white">Номер телефону</Text>
                    <Text className="text-white">+380-99-639-**-**</Text>
                </View>
                <View>
                    <Text className="text-white">Про себе</Text>
                    <Text className="text-white">Хз</Text>
                </View>
                <View>
                    <Text className="text-white">Ім'я користувача</Text>
                    <Text className="text-white">@mila_krutaja</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
