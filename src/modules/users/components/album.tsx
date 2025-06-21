import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { Heading } from "../../../shared/ui/heading/heading";
import { IAlbum } from "../types";
import { RoundedButton } from "../../../shared/ui/button/button";
import { ICONS } from "../../../shared/ui/icons";
import { buildImageUrl, pickImage } from "../../../shared/utils/images";
import { capitalize } from "../../../shared/utils/base";
import { albumsService } from "../services/albums";
import { getErrorMessage } from "../../../shared/utils/errors";
import { useState } from "react";

export function Album({ albumData: initialAlbumData }: { albumData: IAlbum }) {
  const [album, setAlbum] = useState(initialAlbumData)
  const updateAlbum = async (data: Partial<IAlbum>) => {
    let updatedAlbum = {};
    try {
      updatedAlbum = await albumsService.updateAlbum(initialAlbumData.id, data)
    } catch (err) {
      Alert.alert("Failed to update album", getErrorMessage(err))
    }
    setAlbum({ ...album, ...updatedAlbum })
  }
  const addAlbumImage = async () => {
    const result = await pickImage({
      mediaTypes: "images",
      allowsMultipleSelection: true,
    });
    if (result && !result.canceled && result.assets) {
      const pickedImages = result.assets.map(asset => {
        const lastPartIdx = asset.uri.lastIndexOf("/")
        const filename = asset.uri.slice(lastPartIdx + 1)
        const file = asset.uri.slice(0, lastPartIdx)
        return { image: { file: file, id: asset.assetId || String(new Date().getTime()), filename } }
      })
      await updateAlbum({ images: pickedImages })
      setAlbum({ ...album, images: [...album.images, ...pickedImages] })
    }
  }
  return (
    <View className="gap-4">
      <Heading label={album.name} action={
        <View className="gap-6 flex-row items-center">
          {album.shown ?
            <RoundedButton onPress={() => updateAlbum({ shown: false })} icon={<ICONS.EyeIcon width={20} height={20} />} /> :
            <RoundedButton onPress={() => updateAlbum({ shown: true })} icon={<ICONS.EyeSlashIcon width={20} height={20} />} />
          }
          <TouchableOpacity>
            <ICONS.PostSettingsIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      } />
      <View className="gap-4 flex-row">
        <Text className="text-darkBlue">{capitalize(album.topic.name)}</Text>
        <Text className="text-grey">{new Date(album.created_at).getFullYear()} рiк</Text>
      </View>
      <View className="border border-grey" />
      <Text className="text-darkBlue">Фотографіїї</Text>
      <View className="flex-row justify-between items-center flex-wrap">
        {album.images.map(({ image }) => (
          <View className="relative mt-3" key={image.id} >
            <Image source={{ uri: buildImageUrl(image) }} className="rounded-xl" width={160} height={160} />
            <View className="absolute top-28 left-16 gap-2 flex-row">
              <RoundedButton filled icon={<ICONS.EyeIcon width={20} height={20} />} />
              <RoundedButton filled icon={<ICONS.BinIcon width={20} height={20} />} />
            </View>
          </View>
        ))}
        <View className="mt-3 w-40 h-40 border-dashed border border-grey justify-center items-center">
          <RoundedButton onPress={async () => await addAlbumImage()} icon={<ICONS.PlusIcon width={20} height={20} />} />
        </View>

      </View>
    </View>
  )
}
