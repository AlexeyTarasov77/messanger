import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { useChat } from "../hooks";
import { Loader } from "../../../shared/ui/loader/loader";
import { MessageCard } from "../components";
import { IUser } from "../../users/types";
import { useUserCtx } from "../../users/components/users-ctx";

export function GroupChatScreen() {
  const { id } = useLocalSearchParams()
  const { isLoading, chat } = useChat(Number(id))
  const router = useRouter()
  const { user } = useUserCtx()
  if (isLoading) return <Loader />
  if (!chat) return <Redirect href="/not-found" />
  const chatMembersMap: Record<number, IUser> = {}
  chat.members.forEach(member => chatMembersMap[member.id] = member)
  return (
    <View className="bg-mainBg h-full">
      <View className="bg-white border border-border rounded-xl mt-3 mb-3">
        <View className="border-b border-border pb-2 p-4 flex-row justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => { router.back() }}
            >
              <ICONS.BackIcon
                width={20}
                height={20}
                fill="#81818D"
              />
            </TouchableOpacity>
            <View className="bg-slive rounded-full w-12 h-12"></View>
            <View>
              <Text className="font-medium text-2xl">
                {chat.name}
              </Text>
              <Text className="text-grey">
                {/* 3 учасники, 1 в мережі */}
                {chat.members.length} учасники
              </Text>
            </View>
          </View>
          <View>
            <ICONS.PostSettingsIcon width={20} height={20} />
          </View>
        </View>
        <ScrollView>
          {chat.messages.map(msg => (
            <MessageCard key={msg.id} msg={{ ...msg, author: chatMembersMap[msg.author_id] }} isOwnMsg={msg.author_id === user?.id} />
          ))}
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
              // onPress={handleSubmit(onSubmit)}
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
