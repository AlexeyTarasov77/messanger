import { Heading } from "../../../../../shared/ui/heading/heading";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { ICONS } from "../../../../../shared/ui/icons";
import { ScrollView, View } from "react-native";
import { Block } from "../block";
import { useUserCtx } from "../../../components/users-ctx";
import { UserPhoto } from "../../../components/photo";

export function MainBlock() {
  const { user } = useUserCtx()
  return (
    <Block>
      <Heading label="Мої фото" action={
        <RoundedButton label="Додати фото" icon={<ICONS.PostsIcon />} />
      }
      />
      <ScrollView horizontal>
        {user?.profile.avatars.map(avatar => (
          <UserPhoto btnsClassname="top-[150] left-[100]" imageURI={avatar.image} key={avatar.id} />
        ))}
      </ScrollView>
    </Block>

  )
}
