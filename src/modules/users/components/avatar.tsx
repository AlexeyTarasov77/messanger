import { Image, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";

export function UserAvatar({
  user,
  className,
  width,
  height,
}: {
  user: { avatarUrl?: string; isOnline: boolean };
  className?: string;
  width: number;
  height: number;
}) {
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: user.avatarUrl || DEFAULT_AVATAR_URL }}
          className={`w-10 h-10 rounded-full ${className}`}
        />
      </View>
      <View className="absolute bottom-0 right-1">
        {user.isOnline ? (
          <ICONS.OnlineIcon width={width} height={height} />
        ) : (
          <ICONS.OfflineIcon width={width} height={height} />
        )}
      </View>
    </View>
  );
}
