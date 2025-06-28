import { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { getUserDisplayName } from "../../users/utils";
import { IUser } from "../../users/types";
import { UserAvatar } from "../../users/components/avatar";

interface IFriendCardProps {
  user: IUser;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

export function FriendCard(props: IFriendCardProps) {
  const { user, leftButton, rightButton } = props;
  return (
    <View className="border-border border justify-center self-center items-center rounded-xl w-[90%] gap-2 py-8 mb-4">
      <UserAvatar
        user={user}
        className="w-[96] h-[96]"
      />
      <View className="self-center">
        <Text className="text-2xl font-bold">{getUserDisplayName(user)}</Text>
      </View>
      <View>
        <Text className=" text-black font-medium">@{user.username}</Text>
      </View>
      <View className="flex-row justify-center gap-2 ">
        {leftButton}
        {rightButton}
      </View>
    </View>
  );
}
