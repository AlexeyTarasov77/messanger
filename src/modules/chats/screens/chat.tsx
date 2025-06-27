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
import { useSocketCtx, useUserCtx } from "../../users/components/users-ctx";
import { useEffect, useState } from "react";
import { PersonalChatWithRelations } from "../types";
import { chatsService } from "../services/chats";
import { UserAvatar } from "../../users/components/avatar";
import { Loader } from "../../../shared/ui/loader/loader";
import { MessageCard } from "../components";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";

export function ChatScreen() {
    const router = useRouter();
    const { socket } = useSocketCtx();
    const { id } = useLocalSearchParams();
    const { user } = useUserCtx();
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
            setMessage("");
        });
    }, [socket]);
    // TODO: remove chat fetching here, because chat will be returned from socket on joinChat
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
    if (!chat || !user) return <Loader />;
    return (
        <View className="bg-mainBg flex-1">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 20}
            >
            {/* <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            > */}
                <View className="bg-white rounded-xl border-border border mb-6 pb-2 mt-3 px-2 flex-1 overflow-hidden">
                    <View className="border-b border-border pb-2 p-4 pt-3 flex-row justify-between">
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    if (router.canGoBack()) {
                                        socket?.emit("disconnectChat", {
                                            chat_group_id: +id,
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

                            {chat.partner ? (
                                <UserAvatar
                                    className="w-12 h-12"
                                    user={chat.partner}
                                />
                            ) : (
                                <View>
                                    <Image
                                        source={{
                                            uri:
                                                chat.avatar ||
                                                DEFAULT_AVATAR_URL,
                                        }}
                                        className="rounded-full w-12 h-12"
                                    />
                                </View>
                            )}
                            <Text className="font-medium text-2xl">
                                {chat?.partner.first_name}{" "}
                                {chat?.partner.last_name}
                            </Text>
                        </View>
                        <View className="items-center self-center">
                            <ICONS.PostSettingsIcon width={20} height={20} />
                        </View>
                    </View>
                    <ScrollView
                        // className="pb-8 pt-2 flex-1"
                        // keyboardShouldPersistTaps="handled"
                        className="pt-2 flex-1"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        {Object.entries(
                            chat.messages.slice().reduce((acc, msg) => {
                                const date = new Date(
                                    msg.sent_at
                                ).toDateString();
                                if (!acc[date]) acc[date] = [];
                                acc[date].push(msg);
                                return acc;
                            }, {} as Record<string, typeof chat.messages>)
                        ).map(([date, messages]) => (
                            <View key={date}>
                                <View className="items-center my-2 bg-border w-[40%] justify-center self-center rounded-lg px py-2">
                                    <Text className="text-base text-darkBlue">
                                        {new Date(date).toLocaleDateString(
                                            "uk-UA",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </Text>
                                </View>
                                {messages.map((msg, index) => (
                                    <MessageCard
                                        key={`${msg.id}-${index}`}
                                        msg={{
                                            ...msg,
                                            author:
                                                msg.author_id === user.id
                                                    ? user
                                                    : chat.partner,
                                        }}
                                        isOwnMsg={msg.author_id === user.id}
                                    />
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                    <View className="flex-row p-4 bottom-0 pr-28 gap-2 items-center">
                        <Input
                            placeholder="Повідомлення"
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            className="w-full h-12"
                        />
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="flex-row items-center justify-center  border-slive border  rounded-full w-10 h-10">
                                <ICONS.ImageIcon />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if (!socket) return;
                                    socket.emit("sendMessage", {
                                        content: message,
                                        attached_image: null,
                                        chat_group_id: +id,
                                    });
                                }}
                                className="flex-row items-center justify-center  bg-slive  rounded-full w-10 h-10"
                            >
                                <ICONS.SendPostIcon width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
            {/* </KeyboardAwareScrollView> */}
        </View>
    );
}
