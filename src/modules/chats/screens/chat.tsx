import { useLocalSearchParams } from "expo-router";
import {
    Text,
    View,
} from "react-native";
import { useUserCtx } from "../../users/components/users-ctx";
import { useEffect, useState } from "react";
import { PersonalChatWithRelations } from "../types";
import { chatsService } from "../services/chats";
import { UserAvatar } from "../../users/components/avatar";
import { BaseChatScreen } from "../components/base-chat-screen";

export function ChatScreen() {
    const [chat, setChat] = useState<PersonalChatWithRelations>();
    const { id } = useLocalSearchParams();
    const { user } = useUserCtx()
    useEffect(() => {
        if (!user) return;
        const f = async () => {
            const chat = await chatsService.getPersonalChat(
                Number(id),
                user!.id
            );
            setChat(chat);
        };
        f();
    }, [user]);
    if (!chat || !user) return
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
