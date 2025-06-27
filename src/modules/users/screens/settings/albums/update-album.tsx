import { IModalBaseProps } from "../../../../main/types";
import { useUserCtx } from "../../../components/users-ctx";
import { ICreateAlbumForm } from "../../../types";
import { AlbumForm } from "./album-form";
import { AlbumModal } from "./album-modal";

export function UpdateteAlbumModal(modalProps: IModalBaseProps) {
    const { addAlbum } = useUserCtx();
    const onSubmit = async (data: ICreateAlbumForm): Promise<string | void> => {
        console.log(data)
        return await addAlbum(data);
    };
    return (
        <AlbumModal {...modalProps} heading="Редагувати альбом">
            <AlbumForm
                defaultValues={{
                    name: "",
                    topic_id: ""
                    // created_at: ""
                }}
                onSubmit={onSubmit}
                onSuccess={modalProps.close}
                close={modalProps.close}
            />
        </AlbumModal>
    );
}
