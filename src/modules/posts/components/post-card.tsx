import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { IPostWithAuthor } from "../types";
import { UserAvatar } from "../../users/components/avatar";
import { getUserDisplayName } from "../../users/utils";
import { UserSignature } from "../../users/components/sig";
import { useState } from "react";
import { Menu, MenuBtn } from "../../../shared/ui/menu";
import { buildImageUrl } from "../../../shared/utils/images";
import { useSocketCtx, useUserCtx } from "../../users/components/users-ctx";
import { ModalName, useModal } from "../../../shared/context/modal";

export function PostCard({
    post,
    menuEnabled,
}: {
    post: IPostWithAuthor;
    menuEnabled: boolean;
}) {
  const { checkUserOnline } = useSocketCtx()
  const [menuOpened, setMenuOpened] = useState(false);
  const { removePost } = useUserCtx()
  const { open } = useModal()
  const handlePostEdit = async () => {
    open({ name: ModalName.UPDATE_POST, props: { postId: post.id } })
  }
  const handlePostRemove = async () => {
    const errMsg = await removePost(post.id)
    if (errMsg) {
      Alert.alert("Failed to remove post", errMsg)
    }
    setMenuOpened(false)
  }
  const menuButtons = [
    <MenuBtn Icon={ICONS.BinIcon} label="Видалити публікацію" onPress={handlePostRemove} />,
    <MenuBtn
      Icon={ICONS.PenIcon}
      label="Редагувати допис"
      onPress={handlePostEdit}
    />
  ]
  return (
    <View className="border border-border rounded-2xl p-2 gap-2 bg-white">
      <View className="flex-row justify-between py-4 px-2">
        <View>
          <View className="flex-row items-center gap-4">
            <UserAvatar user={{ profile: post.author, ...post.author.user }} isUserOnline={checkUserOnline(post.author.user.id)} className="w-12 h-12" width={48} height={48}/>
            <View className="font-medium text-sm">
              <Text>{getUserDisplayName(post.author.user)}</Text>
            </View>
          </View>
          {!!post.author.signature && (
            <UserSignature signatureUrl={post.author.signature} />
          )}
        </View>
        <View className="self-center relative">
          <TouchableOpacity onPress={() => setMenuOpened(!menuOpened)}>
            <ICONS.PostSettingsIcon height={16} />
          </TouchableOpacity>
          {menuEnabled && menuOpened && <Menu buttons={menuButtons} />}
        </View>
      </View>
      <View className="border-t border-border pt-4 px-2 gap-4">
        <Text className="flex-wrap text-lg leading-none font-main font-medium">
          {post.title}
        </Text>
        <Text className="flex-wrap font-normal text-sm leading-none">
          {post.content}
        </Text>
        <View className="flex-row flex-wrap font-normal text-sm leading-none gap-1">
          {post.tags.map(tag => (
            <Text className="text-text" key={tag.id}>
              #{tag.name}
            </Text>
          ))}
        </View>
        <View className="flex-row flex-wrap justify-center">
          {post.images.map((media) => (
            <Image
              key={media.id}
              source={{ uri: buildImageUrl(media) }}
              className="rounded-2xl m-2 w-40 h-60"
            />
          ))}
        </View>
      </View>
      <View className="flex-row gap-4">
        <View className="flex-row items-center">
          <ICONS.LikeIcon width={20} height={20} />
          <Text> {post._count.likes} Вподобань</Text>
        </View>

                <View className="flex-row ">
                    <ICONS.EyeIcon width={20} height={20} />
                    <Text> {post._count.views} Переглядів</Text>
                </View>
            </View>
        </View>
    );
}
