import { View } from "react-native";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { Heading } from "../../../../../shared/ui/heading/heading";
import { ICONS } from "../../../../../shared/ui/icons";
import { useUserCtx } from "../../../components/users-ctx/context";
import { Block } from "../block";
import { Album } from "../../../components/album";

export function AlbumsList() {
  const { user } = useUserCtx()
  if (!user) return
  return (
    <View className="gap-3">
      {
        user.albums ?
          user.albums.map(album => (
            <Block key={album.id}><Album albumData={album} /></Block>
          ))
          :
          <Block>
            <Heading label="Немає ще жодного альбому" action={
              <RoundedButton icon={<ICONS.PlusIcon width={20} height={20} />} />
            }
            />
          </Block>
      }
    </View>
  )
}
