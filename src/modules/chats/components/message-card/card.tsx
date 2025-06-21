import { View, Text, Image, TouchableOpacity } from "react-native";
import { IMessageCard, IUser } from "../../types";
import { UserAvatar } from "../../../users/components/avatar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserDisplayName } from "../../../users/utils";

export function MessageCard({ user, message, time }: IMessageCard) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    return (
        <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => {
                router.push(`/chats/${id}`);
            }}
        >
            {/* <UserAvatar user={user?} /> */}
            <View className="flex-1">
                <Text className="font-medium text-lg">
                    {getUserDisplayName(user)}
                </Text>
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                    {message}
                </Text>
            </View>
            <Text className="text-xs text-gray-400 ml-auto">{time}</Text>
        </TouchableOpacity>
    );
}
