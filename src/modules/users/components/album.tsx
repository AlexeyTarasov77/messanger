import { Text, TouchableOpacity, View, Image } from "react-native";
import { Heading } from "../../../shared/ui/heading/heading";
import { IAlbum } from "../types";
import { RoundedButton } from "../../../shared/ui/button/button";
import { ICONS } from "../../../shared/ui/icons";

export function Album({ albumData }: { albumData: IAlbum }) {
  return (
    <View className="gap-4">
      <Heading label={albumData.name} action={
        <View className="gap-6 flex-row items-center">
          <RoundedButton icon={<ICONS.EyeIcon width={20} height={20} />} />
          <TouchableOpacity>
            <ICONS.PostSettingsIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      } />
      <View className="gap-4 flex-row">
        <Text className="text-darkBlue">{albumData.subject}</Text>
        <Text className="text-grey">{albumData.year} рiк</Text>
      </View>
      <View className="border border-grey" />
      <Text className="text-darkBlue">Фотографіїї</Text>
      <View className="flex-row justify-between items-center flex-wrap">
        {albumData.photos.map(photo => (
          <View className="relative mt-3" key={photo.id} >
            <Image source={{ uri: photo.url }} className="rounded-xl" width={160} height={160} />
            <View className="absolute top-28 left-16 gap-2 flex-row">
              <RoundedButton filled icon={<ICONS.EyeIcon width={20} height={20} />} />
              <RoundedButton filled icon={<ICONS.BinIcon width={20} height={20} />} />
            </View>
          </View>
        ))}
        <View className="mt-3 w-40 h-40 border-dashed border border-grey justify-center items-center">
          <RoundedButton icon={<ICONS.PlusIcon width={20} height={20} />} />
        </View>

      </View>
    </View>
  )
}
