import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChatGroupWithLastMsg, ChatMessageWithAuthor } from "../../types";
import { getUserDisplayName } from "../../../users/utils";
import { formatDate } from "../../../../shared/utils/dates";
import { DEFAULT_AVATAR_URL } from "../../../../shared/constants";

export interface IGroupCardProps {
    groupId: number
    groupName: string;
    lastMsg: ChatMessageWithAuthor
}

export function GroupCard({ chat }: { chat: ChatGroupWithLastMsg }) {
    const router = useRouter();
    return (
        <TouchableOpacity
            className="flex-row items-center gap-4"
            onPress={() => { router.push(`/chats/groups/${chat.id}`) }}
        >
            <View>
                <Image
                    source={{ uri: chat.avatar || DEFAULT_AVATAR_URL }}
                    className="rounded-full w-12 h-12"
                />
            </View>
            <View className="flex-1">
                <Text className="font-medium text-lg">{chat.name}</Text>
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                    {getUserDisplayName(chat.lastMessage.author)}: {chat.lastMessage.content}
                </Text>
            </View>
            <Text className="text-xs text-gray-400 ml-auto">{formatDate(new Date(chat.lastMessage.sent_at), "%H:%M")}</Text>
        </TouchableOpacity>
    );
}
