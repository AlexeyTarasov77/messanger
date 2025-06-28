import { IModalBaseProps } from "../../../../main/types";
import { useUserCtx } from "../../../components/users-ctx";
import { ICreateAlbumForm } from "../../../types";
import { AlbumForm } from "./album-form";
import { AlbumModal } from "./album-modal";

export function UpdateteAlbumModal({
    albumId,
    ...modalProps
}: IModalBaseProps & { albumId?: number }) {
    const { updateAlbum, user } = useUserCtx();
    const album = user?.profile?.albums.find((album) => album.id === albumId);
    const onSubmit = async (data: ICreateAlbumForm): Promise<string | void> => {
        console.log(data);
        return await updateAlbum(data, album!.id);
    };
    return (
        <AlbumModal {...modalProps} heading="Редагувати альбом">
            {album && (
                <AlbumForm
                    defaultValues={{
                        ...album
                        // name: "",
                        // topic_id: "",
                        // created_at: ""
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
