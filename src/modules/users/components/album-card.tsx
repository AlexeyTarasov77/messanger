import { View, Text, ScrollView, Image } from "react-native";
import { IAlbumWithAuthor } from "../types";

export function AlbumCard({ album }: { album: IAlbumWithAuthor }) {
    return (
        <View className="bg-white">
            <View className="pt-4 gap-2">
                <Text className="font-bold">{album.name}</Text>
                <View className="flex-row gap-4">
                    <Text>{album.subject}</Text>
                    <Text className="text-grey"> {album.year} рік</Text>
                </View>
            </View>
            <ScrollView className="flex-row flex-wrap ">
                {album.photos.map((photo) => (
                    <Image
                        key={photo.id}
                        source={{ uri: photo.url }}
                        className="rounded-2xl m-2 w-40 h-60"
                    />
                ))}
            </ScrollView>
        </View>
    );
}
