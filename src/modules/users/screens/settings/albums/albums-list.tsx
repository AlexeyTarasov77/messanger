import { View } from "react-native";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { Heading } from "../../../../../shared/ui/heading/heading";
import { ICONS } from "../../../../../shared/ui/icons";
import { useUserCtx } from "../../../components/users-ctx";
import { Block } from "../block";
import { Album } from "../../../components/album/album";
import { ModalName, useModal } from "../../../../../shared/context/modal";

export function AlbumsList() {
    const { user } = useUserCtx();
    const { open: openModal } = useModal();
    if (!user || !user.profile || !user.profile.albums) return;
    return (
        <View className="gap-3">
            {user.profile.albums.length ? (
                user.profile.albums.map((album) => (
                    // setting id in conjuction with updated at, to correctly rerender when album is updated
                    // if only id is used - rerender is not trigerred on update
                    <Block key={`${album.id}-${album.updated_at}`}>
                        <Album albumData={album} menuEnabled={true} />
                    </Block>
                ))
            ) : (
                <Block>
                    <Heading
                        label="Немає ще жодного альбому"
                        action={
                            <RoundedButton
                                onPress={() => { openModal({ name: ModalName.CREATE_ALBUM }) }}
                                icon={<ICONS.PlusIcon width={20} height={20} />}
                            />
                        }
                    />
                </Block>
            )}
        </View>
    );
}
