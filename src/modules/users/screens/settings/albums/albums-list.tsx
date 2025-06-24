import { View, Text } from "react-native";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { Heading } from "../../../../../shared/ui/heading/heading";
import { ICONS } from "../../../../../shared/ui/icons";
import { useUserCtx } from "../../../components/users-ctx";
import { Block } from "../block";
import { Album } from "../../../components/album";
import { ModalName, useModal } from "../../../../../shared/context/modal";

export function AlbumsList() {
    const { user } = useUserCtx();
    const { open: openModal } = useModal();
    if (!user) return;
    return (
        <View className="gap-3">
            {user.profile.albums ? (
                user.profile.albums.map((album) => (
                    <Block key={album.id}>
                        <Album albumData={album} />
                    </Block>
                ))
            ) : (
                <Block>
                    <Text>Block</Text>
                </Block>
            )}
            <Block>
                <Heading
                    label="Немає ще жодного альбому"
                    action={
                        <RoundedButton
                            onPress={() => {openModal({ name: ModalName.CREATE_ALBUM })}}
                            icon={<ICONS.PlusIcon width={20} height={20} />}
                        />
                    }
                />
            </Block>
        </View>
    );
}
