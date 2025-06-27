import { View, Text, Image } from "react-native";
import { IAlbum } from "../types";
import { capitalize } from "../../../shared/utils/base";

export function AlbumPreview({ album }: { album: IAlbum }) {
    if (!album.created_at)return
    return (
        <View className="bg-white w-full gap-3">
            <View className="pt-4 gap-2">
                <Text className="font-bold">{album.name}</Text>
                <View className="gap-4 flex-row">
                    <Text className="text-darkBlue">{capitalize(album.topic.name)}</Text>
                    <Text className="text-grey">{new Date(album.created_at).getFullYear()} рiк</Text>
                </View>
            </View>
            <View className="w-full">
                <Image source={{ uri: album.preview_image }} className="w-full h-40 rounded-2xl" />
            </View>
        </View>
    );
}
