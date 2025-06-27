import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { useSocketCtx, useUserCtx } from "../../users/components/users-ctx";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ChatGroupWithMessages } from "../types";
import { Loader } from "../../../shared/ui/loader/loader";
import { MessageCard } from "../components";
import { IUser } from "../../users/types";

interface BaseChatProps {
  chat: ChatGroupWithMessages;
  setChat: React.Dispatch<React.SetStateAction<ChatGroupWithMessages | undefined>>;
  chatInfo: ReactNode;
  getMsgAuthor: (authorId: number) => IUser
}

export function BaseChatScreen({ chat, setChat, chatInfo, getMsgAuthor }: BaseChatProps) {
  const router = useRouter();
  const { socket } = useSocketCtx();
  const { id } = useLocalSearchParams();
  const { user } = useUserCtx();
  const [message, setMessage] = useState<string>("");
  const messagesBoxRef = useRef<ScrollView>(null);

  useEffect(() => messagesBoxRef.current?.scrollToEnd({ animated: true }), [chat])
  useEffect(() => {
    if (!socket) return;
    socket.emit("joinChat", { chat_group_id: +id });

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
  if (!chat || !user) return <Loader />;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 20}
    >
      <View className="bg-mainBg h-full">
        <View className="bg-white rounded-xl border-border border mb-6 pb-2 mt-3 flex-1 px-2">
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
              {chatInfo}
            </View>
            <View className="items-center self-center">
              <ICONS.PostSettingsIcon width={20} height={20} />
            </View>
          </View>
          <ScrollView className="pb-8 pt-2" ref={messagesBoxRef}>
            <View className="flex-1">
              {Object.entries(
                chat.messages
                  .slice()
                  .reduce((acc, msg) => {
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
                        author: getMsgAuthor(msg.author_id),
                      }}
                      isOwnMsg={msg.author_id === user.id}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
          <View className="flex-row p-6 bottom-0 gap-2 items-center">
            <Input
              placeholder="Повідомлення"
              onChangeText={(val) => setMessage(val)}
              value={message}
              className="w-[76%] h-12"
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
      </View>
    </KeyboardAvoidingView>
  );
}
