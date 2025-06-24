import { View, Text, Image, TouchableOpacity } from "react-native";
import { ChatMessageWithAuthor } from "../../types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserDisplayName } from "../../../users/utils";
import { formatDate } from "../../../../shared/utils/dates";
import { UserAvatar } from "../../../users/components/avatar";

export function MessageCard({ msg, isOwnMsg }: { msg: ChatMessageWithAuthor, isOwnMsg: boolean }) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    return (
        <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => {
                router.push(`/chats/${id}`);
            }}
        >
            <UserAvatar user={msg.author} />
            <View className="flex-1">
                <Text className="font-medium text-lg">
                    {getUserDisplayName(msg.author)}
                </Text>
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                    {msg.content}
                </Text>
            </View>
            <Text className="text-xs text-gray-400 ml-auto">{formatDate(new Date(msg.sent_at), "%H:%M")}</Text>
        </TouchableOpacity>
    );
}
