import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { useChat } from "../hooks";
import { Loader } from "../../../shared/ui/loader/loader";
import { IUser } from "../../users/types";
import { BaseChatScreen } from "../components/base-chat-screen";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";


export function GroupChatScreen() {
  const { id } = useLocalSearchParams()
  const { isLoading, chat, setChat } = useChat(Number(id))
  if (isLoading) return <Loader />
  if (!chat) return
  const chatMembersMap: Record<number, IUser> = {}
  chat.members.forEach(member => chatMembersMap[member.id] = member)

  return <BaseChatScreen
    menuEnabled={true}
    setChat={setChat as any}
    chat={chat}
    getMsgAuthor={(authorId: number) => chatMembersMap[authorId]}
    chatInfo={<>
      <Image source={{ uri: chat.avatar || DEFAULT_AVATAR_URL }} className="rounded-full w-12 h-12" />
      <View>
        <Text className="font-medium text-2xl">
          {chat.name}
        </Text>
        <Text className="text-grey">
          {/* amount of chat members including admin */}
          {chat.members.length + 1} учасники
        </Text>
      </View>

    </>}
  />
}
