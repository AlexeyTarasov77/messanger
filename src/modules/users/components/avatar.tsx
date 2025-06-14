import { Image, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { IUserAvatarProps } from "./avatar.types";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants"

export function UserAvatar({ 
  avatarUrl, 
  isOnline, 
  ...props 
}: IUserAvatarProps) {
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: avatarUrl || DEFAULT_AVATAR_URL }}
          className="w-10 h-10 rounded-full"
        />
      </View>
      <View className="absolute bottom-0 right-0">
        {isOnline ? (
          <ICONS.OnlineIcon width={12} height={12} />
        ) : (
          <ICONS.OfflineIcon width={12} height={12} />
        )}
      </View>
    </View>
  )
}

function UserAvatarWithoutOnline(props: Omit<IUserAvatarProps, "isOnline">) {
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: props.avatarUrl || DEFAULT_AVATAR_URL }}
          className="w-10 h-10 rounded-full"
        />
      </View>
    </View>
  );
}

UserAvatar.UserAvatarWithoutOnline = UserAvatarWithoutOnline;
