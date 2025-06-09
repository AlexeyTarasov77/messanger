import { Image, View } from "react-native";
import { ICONS } from "../../../shared/ui/icons";

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
  const defaultAvatarUrl =
    "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png";
  return (
    <View className="flex-row">
      <View>
        <Image
          source={{ uri: user.avatarUrl || defaultAvatarUrl }}
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
