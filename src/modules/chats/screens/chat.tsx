import { useLocalSearchParams, useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { useSocketCtx } from "../../users/components/users-ctx";
import { useEffect, useState } from "react";
import { ChatGroupWithRelations } from "../types";
import { MessageCard } from "../components";
import { getUserAvatar } from "../../users/utils";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";

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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 20}
        >
            <View className="bg-mainBg h-full ">
                <View className="bg-white border border-border rounded-xl mt-3 mb-3 flex-1">
                    <View className="border-b border-border pb-2 p-4 flex-row justify-between">
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    if (router.canGoBack()) {
                                        socket?.emit("leaveChat", {
                                            chatId: +id,
                                        });
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
                            <View className="bg-slive rounded-full w-12 h-12">
                                {/* avatar */}
                                {chat?.members.map((member) => {
                                    if (member.id !== chat.admin_id) {
                                        return (
                                            <View className="font-medium text-2xl">
                                                {/* <Image >{getUserAvatar(member.profile.avatars)}</Image> */}

                                                <Image
                                                    source={{
                                                        uri:
                                                            getUserAvatar(
                                                                member
                                                            )?.image ||
                                                            DEFAULT_AVATAR_URL,
                                                    }}
                                                />
                                            </View>
                                        );
                                    }
                                })}
                            </View>
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
                        <View className="self-center">
                            <ICONS.PostSettingsIcon width={20} height={20} />
                        </View>
                    </View>
                    <ScrollView
                        className="flex-1 flex-grow-1"
                        automaticallyAdjustKeyboardInsets={true}
                    >
                        {chat?.messages.map((message) => {
                            return (
                                <MessageCard
                                    key={message.id}
                                    isOwnMsg={false}
                                    msg={message}
                                ></MessageCard>
                            );
                        })}
                    </ScrollView>
                    <View className="flex-row p-6 bottom-0 gap-4">
                        <Input
                            placeholder="Повідомлення"
                            className="w-3/4 h-12"
                        />
                        <View className="flex-row gap-2 self-center">
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
        </KeyboardAvoidingView>
    );
}
