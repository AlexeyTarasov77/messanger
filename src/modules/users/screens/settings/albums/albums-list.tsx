import { View } from "react-native";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { Heading } from "../../../../../shared/ui/heading/heading";
import { ICONS } from "../../../../../shared/ui/icons";
import { useUserCtx } from "../../../components/users-ctx/context";
import { Block } from "../block";

export function AlbumsList() {
  const { user } = useUserCtx()
  if (!user) return
  return (
    <Block>
      {
        user.albums ?
          user.albums.map(album => (
            <View key={album.id}></View>
          ))
          :
          <Heading label="Немає ще жодного альбому" action={
            <RoundedButton icon={<ICONS.PlusIcon width={20} height={20} />} />
          }
          />
      }
    </Block>
  )
}
