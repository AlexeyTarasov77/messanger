import { ScrollView, View } from "react-native";
import { useGetUserById } from "../hooks/use-get-user-by-id";

import { AlbumCard } from "./album-card";


export function UserAlbums({ userId }: { userId: number }) {
    let { user } = useGetUserById(userId);
    if (!user) {
        return "User does not exist";
    }
    return (
        <ScrollView className="bg-white pt-4">
            <View className="gap-4 pb-8r">
                {user.albums.map((album) => (
                    <AlbumCard
                        key={album.id}
                        album={{ ...album, author: user }}
                    />
                ))}
            </View>
        </ScrollView>
    );
}
