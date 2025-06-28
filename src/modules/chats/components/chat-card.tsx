import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChatGroupWithLastMsg } from "../types";
import { getUserDisplayName } from "../../users/utils";
import { formatDate } from "../../../shared/utils/dates";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";
import { IUser } from "../../users/types";
import { UserAvatar } from "../../users/components/avatar";
import { useSocketCtx } from "../../users/components/users-ctx";

export function ChatCard({
    chat,
    user,
}: {
    chat: ChatGroupWithLastMsg;
    user?: IUser;
}) {
    const { checkUserOnline } = useSocketCtx()
    const router = useRouter();
    return (
        <TouchableOpacity
            className="flex-row items-center gap-4"
            onPress={() => {
                router.push(chat.is_personal_chat ? `/chats/${chat.id}` : `/chats/groups/${chat.id}`);
            }}
        >
            {user ? (
                <UserAvatar isUserOnline={checkUserOnline(user.id)} className="w-12 h-12" user={user} />
            ) : (
                <View>
                    <Image
                        source={{ uri: chat.avatar || DEFAULT_AVATAR_URL }}
                        className="rounded-full w-12 h-12"
                    />
                </View>
            )}
            <View className="flex-1">
                <Text className="font-medium text-lg">
                    {user ? getUserDisplayName(user) : chat.name}
                </Text>
                {chat.lastMessage &&
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                        {!chat.is_personal_chat &&
                            getUserDisplayName(chat.lastMessage.author) + " "
                        }
                        {chat.lastMessage.content}
                    </Text>
                }
            </View>
            {chat.lastMessage &&
                <Text className="text-xs text-gray-400 ml-auto">
                    {formatDate(new Date(chat.lastMessage.sent_at), "%H:%M")}
                </Text>
            }
        </TouchableOpacity>
    );
}
