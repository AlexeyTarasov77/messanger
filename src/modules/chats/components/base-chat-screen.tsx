import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
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
import { ChatGroupWithMessages, ChatMessage } from "../types";
import { Loader } from "../../../shared/ui/loader/loader";
import { MessageCard } from "../components";
import { IUser } from "../../users/types";
import { pickImage } from "../../../shared/utils/images";
import { Menu, MenuBtn } from "../../../shared/ui/menu";
import { ModalName, useModal } from "../../../shared/context/modal";
import { chatsService } from "../services/chats";

interface BaseChatProps {
  chat: ChatGroupWithMessages;
  setChat: React.Dispatch<React.SetStateAction<ChatGroupWithMessages | undefined>>;
  chatInfo: ReactNode;
  getMsgAuthor: (authorId: number) => IUser
  menuEnabled?: boolean
}

type MessageSendPayload = {
  content: string;
  attached_image?: string;
}

export function BaseChatScreen({ chat, setChat, chatInfo, getMsgAuthor, menuEnabled }: BaseChatProps) {
  const { open } = useModal()
  const router = useRouter();
  const [menuOpened, setMenuOpened] = useState(false)
  const { socket } = useSocketCtx();
  const { id } = useLocalSearchParams();
  const { user } = useUserCtx();
  const [inputMessage, setInputMessage] = useState<MessageSendPayload | null>(null);
  const messagesBoxRef = useRef<ScrollView>(null);

  const pickMessageImage = async () => {
    const result = await pickImage({
      mediaTypes: "images",
      base64: true
    });
    if (result && !result.canceled && result.assets) {
      const imageUri = result.assets[0].base64!
      setInputMessage(prev => (prev ? { ...prev, attached_image: imageUri } : { attached_image: imageUri, content: "" }))
    }
  }

  useEffect(() => messagesBoxRef.current?.scrollToEnd({ animated: true }), [chat])
  useEffect(() => {
    if (!socket) return;
    socket.emit("joinChat", { chat_group_id: +id });

    socket.on("newMessage", (data: ChatMessage) => {
      setChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, data],
        };
      });
      setInputMessage(null);
    });
  }, [socket]);
  if (!chat || !user) return <Loader />;
  const deleteChat = async () => {
    await chatsService.deleteChat(chat.id)
    router.replace("/chats/groups/group-messages")
  }
  const leaveChat = async () => {
    await chatsService.leaveChat(chat.id)
    router.replace("/chats/groups/group-messages")
  }
  const menuButtons = [
    <MenuBtn Icon={ICONS.PostsIcon} label="Медіа" />
  ]
  user.id === chat.admin_id ? menuButtons.push(
    <MenuBtn
      Icon={ICONS.PenIcon}
      label="Редагувати группу"
      onPress={() => open({ name: ModalName.UPDATE_CHAT, props: { chat } })}
    />,
    <MenuBtn Icon={ICONS.BinIcon} label="Видалити чат" onPress={deleteChat} />
  ) : menuButtons.push(<MenuBtn Icon={ICONS.LogOutIcon} label="Покинути группу" onPress={leaveChat} />)
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
            <View className="self-center relative">
              <TouchableOpacity onPress={() => setMenuOpened(!menuOpened)}>
                <ICONS.PostSettingsIcon height={16} />
              </TouchableOpacity>
              {menuEnabled && menuOpened && <Menu buttons={menuButtons} />}
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
          {inputMessage?.attached_image &&
            <View><Image source={{ uri: "data:image/png;base64, " + inputMessage.attached_image }} className="w-20 h-20 rounded-lg" /></View>
          }
          <View className="flex-row p-6 bottom-0 gap-2 items-center">
            <Input
              placeholder="Повідомлення"
              onChangeText={(val) => setInputMessage(prev => (prev ? { ...prev, content: val } : { content: val }))}
              value={inputMessage?.content || ""}
              className="w-3/4 h-12"
            />
            <View className="flex-row gap-2">
              <TouchableOpacity onPress={pickMessageImage} className="flex-row items-center justify-center  border-slive border  rounded-full w-10 h-10">
                <ICONS.ImageIcon />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (!socket || !inputMessage) return;
                  socket.emit("sendMessage", {
                    ...inputMessage,
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
    </KeyboardAvoidingView>
  );
}
