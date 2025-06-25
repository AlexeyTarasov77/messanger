import { Heading } from "../../../../../shared/ui/heading/heading";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { ICONS } from "../../../../../shared/ui/icons";
import { View } from "react-native";
import { Block } from "../block";
import { useUserCtx } from "../../../components/users-ctx";
import { UserPhoto } from "../../../components/photo";
import { UICarousel } from "../../../../../shared/ui/carousel/carousel";
import { usersService } from "../../../services";
import { pickImage } from "../../../../../shared/utils/images";
import { IUserAvatar } from "../../../types";

export function MainBlock() {
  const { user, updateUserData } = useUserCtx()
  const addAvatar = async () => {
    const result = await pickImage({ mediaTypes: "images" })
    if (result && !result.canceled && result.assets) {
      const imageUri = result.assets[0].uri
      await usersService.updateUser({ avatar: imageUri })
      const newAvatar: IUserAvatar = {
        id: 999,
        image: imageUri,
        shown: true,
        active: true
      }
      updateUserData({ profile: { avatars: [...user!.profile.avatars, newAvatar], date_of_birth: user!.profile.date_of_birth } })
    }
  }
  return (
    <Block>
      <Heading label="Мої фото" action={
        <RoundedButton label="Додати фото" icon={<ICONS.PostsIcon />} onPress={addAvatar} />}
      />
      <UICarousel
        // sort by ids assuming that id is sequential growing number to show newest avatars first
        data={(user?.profile.avatars!).sort((a, b) => a.id > b.id ? -1 : 1)}
        renderItem={({ item }) => (
          <View className="flex items-center justify-center">
            <UserPhoto imgSize={300} btnsClassname="top-[180] left-[180]" imageURI={item.image} key={item.id} />
          </View>
        )}
      />
    </Block>

  )
}
