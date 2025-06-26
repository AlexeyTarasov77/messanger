import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { useSocketCtx } from "../../users/components/users-ctx";
import { useEffect, useState } from "react";
import { ChatGroupWithRelations } from "../types";

export function ChatScreen() {
    const router = useRouter();
    const { socket } = useSocketCtx();
    const { id } = useLocalSearchParams();
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<ChatGroupWithRelations>();
    useEffect(() => {
        if (!socket) return;
        socket.emit("joinChat", { chatId: +id }, (data: any) => {
            if (data.status == "success") {
                setChat(data.data);
            }
        });

        socket.on("newMessage", (data) => {
            if (!chat) return;
            setChat({ ...chat, messages: [...chat.messages, data] });
        });
    }, [socket]);
    useEffect(() => {
        console.log(chat);
    }, [chat]);

    return (
        <View className="bg-mainBg h-full">
            <View className="bg-white border border-border rounded-xl mt-3 mb-3">
                <View className="border-b border-border pb-2 p-4 flex-row justify-between">
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => {
                                if (router.canGoBack()) {
                                    socket?.emit("leaveChat", { chatId: +id });
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
                        <View className="bg-slive rounded-full w-12 h-12"></View>
                        <View>
                            {chat?.members.map((member) => {
                                if (member.id !== chat.admin_id) {
                                    return (
                                        <Text className="font-medium text-2xl">
                                            {member.username}
                                        </Text>
                                    );
                                }
                            })}
                        </View>
                    </View>
                    <View>
                        <ICONS.PostSettingsIcon width={20} height={20} />
                    </View>
                </View>
                <ScrollView>
                    
                </ScrollView>
                <View className="flex-row p-6 bottom-0 ">
                    <Input placeholder="Повідомлення" className="w-5/6 h-12" />
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            // onPress={pickPostImages}
                            className="flex-row items-center justify-center  border-slive border  rounded-full w-10 h-10"
                        >
                            <ICONS.ImageIcon />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                if (!socket) return;
                                socket.emit("sendMessage", {
                                    text: message,
                                    mediaUrl: null,
                                    type: "text",
                                    chatId: +id,
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
