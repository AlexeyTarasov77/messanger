import { IModalBaseProps } from "../../../../main/types";
import { useUserCtx } from "../../../components/users-ctx";
import { CreateAlbumPayload } from "../../../components/users-ctx/user/context";
import { ICreateAlbumForm } from "../../../types";
import { AlbumForm } from "./album-form";
import { AlbumModal } from "./album-modal";

export function CreateAlbumModal(modalProps: IModalBaseProps) {
    const { addAlbum } = useUserCtx();
    const onSubmit = async (data: CreateAlbumPayload): Promise<string | void> => {
        console.log(data)
        return await addAlbum(data);
    };
    return (
        <AlbumModal {...modalProps} heading="Створити альбом">
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
