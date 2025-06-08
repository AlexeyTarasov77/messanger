import { View } from "react-native";
import { MainBlock } from "./main-block";
import { AlbumsList } from "./albums-list";

export function Layout() {
  return (
    <View className="gap-2">
      <MainBlock />
      <AlbumsList />
    </View>
  );
}
