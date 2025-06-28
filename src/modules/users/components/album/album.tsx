import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { Heading } from "../../../../shared/ui/heading/heading";
import { IAlbum } from "../../types";
import { RoundedButton } from "../../../../shared/ui/button/button";
import { ICONS } from "../../../../shared/ui/icons";
import { buildImageUrl, pickImage } from "../../../../shared/utils/images";
import { capitalize } from "../../../../shared/utils/base";
import { albumsService } from "../../services/albums";
import { getErrorMessage } from "../../../../shared/utils/errors";
import { useState } from "react";
import { UserPhoto } from "../photo";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { useUserCtx } from "../users-ctx";
import { Menu, MenuBtn } from "../../../../shared/ui/menu";

export function Album({
    albumData: initialAlbumData,
    menuEnabled,
}: {
    albumData: IAlbum;
    menuEnabled: boolean;
}) {
    const [album, setAlbum] = useState(initialAlbumData);
    const [menuOpened, setMenuOpened] = useState(false);
    const { removeAlbum } = useUserCtx();
    const { open } = useModal();
    const handleAlbumEdit = async () => {
        open({ name: ModalName.UPDATE_ALBUM, props: { albumId: album.id } });
    };

    const handleAlbumRemove = async () => {
        const errMsg = await removeAlbum(album.id);
        if (errMsg) {
            Alert.alert("Failed to remove album", errMsg);
        }
        setMenuOpened(false);
    };

    const menuButtons = [
        <MenuBtn
            Icon={ICONS.BinIcon}
            label="Видалити альбом"
            onPress={handleAlbumRemove}
        />,
        <MenuBtn
            Icon={ICONS.PenIcon}
            label="Редагувати альбом"
            onPress={handleAlbumEdit}
        />,
    ];
    const updateAlbum = async (data: Partial<IAlbum>) => {
        let updatedAlbum = {};
        try {
            updatedAlbum = await albumsService.updateAlbum(
                data,
                initialAlbumData.id
            );
        } catch (err) {
            Alert.alert("Failed to update album", getErrorMessage(err));
        }
        setAlbum({ ...album, ...updatedAlbum });
    };
    const addAlbumImage = async () => {
        const result = await pickImage({
            mediaTypes: "images",
            allowsMultipleSelection: true,
        });
        if (result && !result.canceled && result.assets) {
            const pickedImages = result.assets.map((asset) => {
                const lastPartIdx = asset.uri.lastIndexOf("/");
                const filename = asset.uri.slice(lastPartIdx + 1);
                const file = asset.uri.slice(0, lastPartIdx);
                return {
                    image: {
                        file: file,
                        id: asset.assetId || String(new Date().getTime()),
                        filename,
                    },
                };
            });
            await updateAlbum({ images: pickedImages });
            setAlbum({
                ...album,
                images: album.images
                    ? [...album.images, ...pickedImages]
                    : pickedImages,
            });
        }
    };
    return (
        <View className="gap-4">
            <Heading
                label={album.name}
                action={
                    <View className="gap-6 flex-row items-center">
                        {album.shown ? (
                            <RoundedButton
                                onPress={() => updateAlbum({ shown: false })}
                                icon={<ICONS.EyeIcon width={20} height={20} />}
                            />
                        ) : (
                            <RoundedButton
                                onPress={() => updateAlbum({ shown: true })}
                                icon={
                                    <ICONS.EyeSlashIcon
                                        width={20}
                                        height={20}
                                    />
                                }
                            />
                        )}
                        <TouchableOpacity>
                            <ICONS.PostSettingsIcon
                                onPress={() => setMenuOpened(!menuOpened)}
                                width={20}
                                height={20}
                            />
                        </TouchableOpacity>
                        {menuEnabled && menuOpened && (
                            <Menu buttons={menuButtons} />
                        )}
                    </View>
                }
            />
            <View className="gap-4 flex-row">
                <Text className="text-darkBlue">
                    {capitalize(album.topic.name)}
                </Text>
                <Text className="text-grey">
                    {new Date(album.created_at).getFullYear()} рiк
                </Text>
            </View>
            <View className="border border-grey" />
            <Text className="text-darkBlue">Фотографіїї</Text>
            <View className="flex-row justify-between items-center flex-wrap">
                {album.images?.map(({ image }) => (
                    <UserPhoto
                        imageURI={buildImageUrl(image)}
                        className="mt-3"
                        btnsClassname="top-28 left-16"
                        iconsSize={20}
                        imgSize={160}
                        key={image.id}
                    />
                ))}
                <View className="mt-3 w-[160] h-40 border-dashed border border-grey justify-center items-center">
                    <RoundedButton
                        onPress={async () => await addAlbumImage()}
                        icon={<ICONS.PlusIcon width={20} height={20} />}
                    />
                </View>
            </View>
        </View>
    );
}
