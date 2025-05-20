import { View, Text } from "react-native";
import { Avatar } from "../../../../shared/ui/avatar";
import { useUserCtx } from "../../components/users-ctx/context";
import { Redirect } from "expo-router";
import { formatDate } from "../../../../shared/utils/dates";
import { getUserDisplayName } from "../../utils";

export function Profile() {
    const { user } = useUserCtx()
    if (!user) {
        return <Redirect href="/users/login" />;
    }
    const birthDate = user.birthDate && new Date(user.birthDate)
    return (
        <View>
            <View className="flex-row gap-10 py-6 px-2">
                <Avatar />
                <View className="justify-center gap-4 ">
                    <Text className="text-white text-4xl font-semibold ">
                        {getUserDisplayName(user)}
                    </Text>
                    <Text className="text-white text-2xl font-light">
                        {user.isOnline ? "У мережі" : "Не у мережi"}
                    </Text>
                </View>
            </View>

            <View className="mt-4 border m-2 rounded-xl p-2 dark:border-bgLight border-white">
                {!!birthDate &&
                    <View>
                        <Text className="text-white dark:text-bgLight font-extralight text-2xl">
                            Дата народженяя
                        </Text>
                        <Text className="text-white dark:text-bgLight font-normal text-2xl">
                            {formatDate(birthDate, "%d-%m-%YYYY")}
                        </Text>
                    </View>
                }
                <View className="h-px w-full bg-white dark:bg-bgLight my-4" />
                <View>
                    <Text className="text-white dark:text-bgLight font-extralight text-2xl">
                        Про себе
                    </Text>
                    <Text className="text-white dark:text-bgLight font-normal text-2xl">
                        {user.aboutMe}
                    </Text>
                </View>
                <View className="h-px w-full bg-white dark:bg-bgLight my-4" />
                <View>
                    <Text className="text-white dark:text-bgLight font-extralight text-2xl">
                        Ім'я користувача
                    </Text>
                    <Text className="text-white dark:text-bgLight font-normal text-2xl">
                        @{user.username}
                    </Text>
                </View>
            </View>
        </View>
    );
}
