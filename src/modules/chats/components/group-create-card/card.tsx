import { View, Text, Image, TouchableOpacity } from "react-native";
import { IGroupCard } from "../../types";
import { UserAvatar, UserIsInGroup } from "../../../users/components/avatar";

export function GroupCreateCard({ user, isInGroup }: IGroupCard) {
  return (
    <View className="flex-row items-center gap-2 p-2 border-b border-gray-400">
      <UserAvatar avatarUrl={user.avatarUrl} isOnline={user.isOnline} />
      <View className="flex-1">
        <Text className="font-medium text-lg">{user.firstName} {user.lastName}</Text>
      </View> 
      <TouchableOpacity
        className="border border-plum min-h-5 min-w-5">
        <UserIsInGroup isInGroup={isInGroup} />
      </TouchableOpacity>
    </View >
  );
}

