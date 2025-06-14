import { View, Text, Image, TouchableOpacity } from "react-native";
import { IMessageCard, IUsers } from "../../types";
import { UserAvatar } from "../../../users/components/avatar";

export function MessageCard({ user, message, time }: IMessageCard) {
    return (
    <View className="flex-row items-center gap-2">
      <UserAvatar avatarUrl={user.avatarUrl} isOnline={user.isOnline} />
      <View className="flex-1">
        <Text className="font-medium text-lg">{user.firstName} {user.lastName}</Text>
        <Text className="text-sm text-gray-600" numberOfLines={1}>{message}</Text>
      </View>
      <Text className="text-xs text-gray-400 ml-auto">{time}</Text>
    </View>
    );
}

