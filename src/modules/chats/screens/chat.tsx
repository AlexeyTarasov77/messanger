import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { useSocketCtx, useUserCtx } from "../../users/components/users-ctx";
import { useEffect, useState } from "react";
import { PersonalChatWithRelations } from "../types";
import { chatsService } from "../services/chats";
import { UserAvatar } from "../../users/components/avatar";
import { Loader } from "../../../shared/ui/loader/loader";
import { MessageCard } from "../components";

export function ChatScreen() {
    const router = useRouter();
    const { socket } = useSocketCtx();
    const { id } = useLocalSearchParams();
    const { user } = useUserCtx()
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<PersonalChatWithRelations>();
    useEffect(() => {
        if (!socket) return;
        socket.emit("joinChat", { chat_group_id: +id }, (data: any) => {
            // TODO: fix invalid response processing
            if (data.status == "success") {
                setChat(data.data);
            }
        });

        socket.on("newMessage", (data) => {
            setChat((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    messages: [...prev.messages, data],
                };
            });
            setMessage("")
        });
    }, [socket]);
    // TODO: remove chat fetching here, because chat will be returned from socket on joinChat
    useEffect(() => {
        if (!user) return
        const f = async () => {
            const chat = await chatsService.getPersonalChat(Number(id), user!.id)
            setChat(chat)
        }
        f()
    }, [user]);
    if (!chat || !user) return <Loader />
    return (
        <View className="bg-mainBg h-full">
            <View className="bg-white border border-border rounded-xl mt-3 mb-3">
                <View className="border-b border-border pb-2 p-4 flex-row justify-between">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => {
                                if (router.canGoBack()) {
                                    socket?.emit("leaveChat", { chat_group_id: +id });
                                    router.back();
                                }
                            }}
                        >
                            <ICONS.BackIcon
                                width={20}
                                height={20}
                                fill="#81818D"
                            />
                        </TouchableOpacity>
                        <UserAvatar user={chat!.partner} />
                        <View>
                            <Text className="font-medium text-2xl">
                                {chat?.partner.username}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <ICONS.PostSettingsIcon width={20} height={20} />
                    </View>
                </View>
                <ScrollView>
                    {chat.messages.reverse().map(msg =>
                        <MessageCard key={msg.id} msg={{ ...msg, author: msg.author_id === user.id ? user : chat.partner }}
                            isOwnMsg={msg.author_id === user.id}
                        />
                    )}
                </ScrollView>
                <View className="flex-row p-6 bottom-0 ">
                    <Input placeholder="Повідомлення" onChangeText={(val) => setMessage(val)} value={message} className="w-5/6 h-12" />
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            className="flex-row items-center justify-center  border-slive border  rounded-full w-10 h-10"
                        >
                            <ICONS.ImageIcon />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                if (!socket) return
                                socket.emit("sendMessage", {
                                    content: message,
                                    attached_image: null,
                                    chat_group_id: +id
                                });
                            }}
                            className="flex-row items-center justify-center  bg-slive  rounded-full w-10 h-10"
                        >
                            <ICONS.SendPostIcon width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
