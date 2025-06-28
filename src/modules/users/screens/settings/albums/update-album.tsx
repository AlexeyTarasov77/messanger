import { IModalBaseProps } from "../../../../main/types";
import { useUserCtx } from "../../../components/users-ctx";
import { CreateAlbumPayload } from "../../../components/users-ctx/user/context";
import { AlbumForm } from "./album-form";
import { AlbumModal } from "./album-modal";

export function UpdateteAlbumModal({
    albumId,
    ...modalProps
}: IModalBaseProps & { albumId?: number }) {
    const { updateAlbum, user } = useUserCtx();
    const album = user?.profile?.albums.find((album) => album.id === albumId);
    const onSubmit = async (data: Partial<CreateAlbumPayload>): Promise<string | void> => {
        return await updateAlbum(data, album!.id);
    };
    return (
        <AlbumModal {...modalProps} heading="Редагувати альбом">
            {album && (
                <AlbumForm
                    defaultValues={{
                        ...album,
                        topic_id: album.topic.id.toString()
                    }}
                    onSubmit={onSubmit}
                    isPartialForm={true}
                    onSuccess={modalProps.close}
                    close={modalProps.close}
                />
            )}
        </AlbumModal>
    );
}
