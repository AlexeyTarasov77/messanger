import { View, Text, TouchableOpacity } from "react-native";
import { IChatListCard } from "../../types";
import { UserAvatar } from "../../../users/components/avatar";
import { useRouter } from "expo-router";

export function ChatListCard({ avatarUrl, username, firstName, lastName }: IChatListCard) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/users/messages`)}
      className="flex-row items-center gap-4 p-3 "
    >
      <UserAvatar.UserAvatarWithoutOnline
        width={50}
        height={50}
        user={{ avatarUrl, id: "1", isOnline: true }}
      />
      <Text className="text-base font-medium">
        {firstName} {lastName}
      </Text>
    </TouchableOpacity>
  );
}

