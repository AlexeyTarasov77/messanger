import { View, Text, Image, TouchableOpacity } from "react-native";
import { IMessageCard, IUser } from "../../types";
import { UserAvatar } from "../../../users/components/avatar";
import { useLocalSearchParams, useRouter } from "expo-router";

export interface IGropCard {
    // id: string
    name: string;
    message: string;
    time: string;
    participant: string;
}

export function GroupCard({ participant, name, message, time }: IGropCard) {
    const {id} = useLocalSearchParams()
    const router = useRouter();
    return (
        <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => { router.push(`/chats/groups/${id}`) }}
        >
            {/* <UserAvatar user={user?} /> */}
            <View className="flex-1">
                <Text className="font-medium text-lg">{name}</Text>
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                    {participant}: {message}
                </Text>
            </View>
            <Text className="text-xs text-gray-400 ml-auto">{time}</Text>
        </TouchableOpacity>
    );
}
