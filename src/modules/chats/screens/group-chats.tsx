import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { useUserChats } from "../hooks";
import { Loader } from "../../../shared/ui/loader/loader";
import { ChatCard } from "../components/chat-card";

export function GroupMessagesScreen() {
    const { isLoading, chats } = useUserChats()
    if (isLoading) return <Loader />
    return (
        <View className="bg-mainBg h-full">
            <ScrollView className="bg-white border border-border rounded-xl mt-3 mb-3">
                <View className="flex-row items-center m-5 gap-5">
                    <View className="w-full gap-5">
                        <View className="flex-row items-center gap-2">
                            <ICONS.MessagesIcon
                                width={20}
                                height={20}
                                fill="#81818D"
                            />
                            <Text className="color-grey dark:text-bgLight font-medium text-xl ">
                                Групові чати
                            </Text>
                        </View>
                        {chats.map(chat => (
                            <ChatCard key={chat.id} chat={chat} />
                        ))}

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
