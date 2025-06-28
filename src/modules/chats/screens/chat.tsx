import { useLocalSearchParams } from "expo-router";
import {
    Text,
    View,
} from "react-native";
import { useUserCtx } from "../../users/components/users-ctx";
import { UserAvatar } from "../../users/components/avatar";
import { BaseChatScreen } from "../components/base-chat-screen";
import { usePersonalChat } from "../hooks/use-chat";
import { Loader } from "../../../shared/ui/loader/loader";

export function ChatScreen() {
    const { id } = useLocalSearchParams();
    const { user } = useUserCtx()
    const { chat, setChat, isLoading } = usePersonalChat(Number(id))
    if (!chat || !user) return
    if (isLoading) return <Loader />
    return <BaseChatScreen
        setChat={setChat as any}
        chat={chat}
        chatInfo={<><UserAvatar className="w-12 h-12" user={chat!.partner} />
            <View>
                <Text className="font-medium text-2xl">
                    {chat?.partner.first_name}{" "}
                    {chat?.partner.last_name}
                </Text>
            </View></>
        }
        getMsgAuthor={(authorId: number) => authorId === user.id
            ? user
            : chat.partner}
    />
}
