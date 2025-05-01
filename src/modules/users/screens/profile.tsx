import { View, Text } from "react-native";
import { Avatar } from "../../../shared/ui/avatar/avatar";

export function Profile() {
    return (
        <View>
            <View className="flex-row gap-10 py-6 px-2">
                <Avatar />
                <View className="justify-center gap-4 ">
                    <Text className="text-white text-4xl font-semibold ">
                        Name
                    </Text>
                    <Text className="text-white text-2xl font-light">
                        У мережі
                    </Text>
                </View>
            </View>

            <View className="mt-4 border m-2 rounded-xl p-2 dark:border-border border-white">
                <View>
                    <Text className="text-white dark:text-border font-extralight text-2xl">
                        Номер телефону
                    </Text>
                    <Text className="text-white dark:text-border font-normal text-2xl">
                        +380-99-639-**-**
                    </Text>
                </View>
                <View className="h-px w-full bg-white dark:bg-border my-4" />
                <View>
                    <Text className="text-white dark:text-border font-extralight text-2xl">
                        Про себе
                    </Text>
                    <Text className="text-white dark:text-border font-normal text-2xl">
                        Хз
                    </Text>
                </View>
                <View className="h-px w-full bg-white dark:bg-border my-4" />
                <View>
                    <Text className="text-white dark:text-border font-extralight text-2xl">
                        Ім'я користувача
                    </Text>
                    <Text className="text-white dark:text-border font-normal text-2xl">
                        @mila_krutaja
                    </Text>
                </View>
            </View>
        </View>
    );
}
