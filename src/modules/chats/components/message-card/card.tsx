import { View, Text, Image, TouchableOpacity } from "react-native";
import { ChatMessageWithAuthor } from "../../types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getUserDisplayName } from "../../../users/utils";
import { formatDate } from "../../../../shared/utils/dates";
import { UserAvatar } from "../../../users/components/avatar";

export function MessageCard({
    msg,
    isOwnMsg,
}: {
    msg: ChatMessageWithAuthor;
    isOwnMsg: boolean;
}) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    return (
        <TouchableOpacity
            className={`flex-row ${isOwnMsg? "justify-end": "justify-start"}`}
            onPress={() => {
                router.push(`/chats/${id}`);
            }}
        >
            {isOwnMsg ? (
                <View className="max-w-[70%] self-end rounded-lg bg-border p-2 items-end mb-2">
                    <View className="w-full items-end">
                        <Text className="text-sm text-darkBlue">
                            {msg.content}
                        </Text>
                    </View>
                    <Text className="text-xs text-gray-400 ml-auto">
                        {formatDate(new Date(msg.sent_at), "%H:%M")}
                    </Text>
                </View>
            ) : (
                <View className="border-border border rounded-lg max-w-[70%] bg-white p-2 mb-2">
                    <UserAvatar user={msg.author} />
                    <View className="flex-1">
                        <Text className="font-sm text-sm text-slive">
                            {getUserDisplayName(msg.author)}
                        </Text>
                        <Text className="text-sm text-darkBlue">
                            {msg.content}
                        </Text>
                    </View>
                    <Text className="text-xs text-gray-400 ml-auto">
                        {formatDate(new Date(msg.sent_at), "%H:%M")}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
