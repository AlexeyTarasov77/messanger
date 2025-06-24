import { IModalBaseProps } from "../../../../main/types";
import { PostModal } from "../../../../posts/components/post-modal";
import { Album } from "../../../components/album";
import { useUserCtx } from "../../../components/users-ctx";
import { ICreateAlbumForm } from "../../../types";
import { AlbumForm } from "./album-form";
import { AlbumModal } from "./album-modal";

export function CreateAlbumModal(modalProps: IModalBaseProps) {
    const { addAlbum } = useUserCtx();
    const onSubmit = async (data: ICreateAlbumForm): Promise<string | void> => {
        return await addAlbum(data);
    };
    return (
        <AlbumModal {...modalProps} heading="Створити альбом">
            <AlbumForm
                defaultValues={{
                    name: "",
                    topic: {name: ""},
                    created_at: ""
                }}
                onSubmit={onSubmit}
            />
        </AlbumModal>
    );
}
