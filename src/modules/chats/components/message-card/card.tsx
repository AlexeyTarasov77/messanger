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
    return (
        <View className={`flex-row ${isOwnMsg ? "justify-end" : "justify-start"}`}>
            {isOwnMsg ? (
                <View className="max-w-[70%] self-end rounded-lg bg-border p-2 items-end mb-2">
                    <View className="w-full items-end">
                        <Text className="text-sm text-darkBlue">
                            {msg.content}
                        </Text>
                    </View>
                    {msg.attached_image &&
                        <View className="p-2">
                            <Image source={{ uri: msg.attached_image }} className="w-40 h-40 rounded-lg" />
                        </View>
                    }
                    <Text className="text-xs text-gray-400 ml-auto">
                        {formatDate(new Date(msg.sent_at), "%H:%M")}
                    </Text>
                </View>
            ) : (
                <View className="flex-1 flex-row gap-2">
                    <UserAvatar user={msg.author} className="w-12 h-12" width={48} height={48}/>
                    <View className="flex-1 border-border border rounded-lg max-w-[70%] bg-white p-2 mb-2">
                        <View>
                            <Text className="font-sm text-sm text-slive">
                                {getUserDisplayName(msg.author)}
                            </Text>
                            <Text className="text-sm text-darkBlue">
                                {msg.content}
                            </Text>
                            {msg.attached_image &&
                                <View className="p-2">
                                    <Image source={{ uri: msg.attached_image }} className="w-40 h-40 rounded-lg" />
                                </View>
                            }
                        </View>
                        <Text className="text-xs text-gray-400 ml-auto">
                            {formatDate(new Date(msg.sent_at), "%H:%M")}
                        </Text>
                    </View>
                </View>
            )}
        </View>

    );
}
