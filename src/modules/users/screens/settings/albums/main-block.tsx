import { Heading } from "../../../../../shared/ui/heading/heading";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { ICONS } from "../../../../../shared/ui/icons";
import { View } from "react-native";
import { Block } from "../block";
import { useUserCtx } from "../../../components/users-ctx";
import { UserPhoto } from "../../../components/photo";
import { UICarousel } from "../../../../../shared/ui/carousel/carousel";

export function MainBlock() {
  const { user } = useUserCtx()
  return (
    <Block>
      <Heading label="Мої фото" action={
        <RoundedButton label="Додати фото" icon={<ICONS.PostsIcon />} />
      }
      />
      <UICarousel
        data={user?.profile.avatars!}
        renderItem={({ item }) => (
          <View className="flex items-center justify-center">
            <UserPhoto imgSize={300} btnsClassname="top-[180] left-[180]" imageURI={item.image} key={item.id} />
          </View>
        )}
      />
    </Block>

  )
}
