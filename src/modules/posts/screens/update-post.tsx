import { ICreatePostForm } from "../types";
import { useUserCtx } from "../../users/components/users-ctx";
import { IModalBaseProps } from "../../main/types";
import { PostForm } from "../components/post-form";
import { buildImageUrl } from "../../../shared/utils/images";
import { PostModal } from "../components/post-modal";

export function UpdatePostModal({
    postId,
    ...modalProps
}: IModalBaseProps & { postId?: number }) {
    const { updatePost, user } = useUserCtx();
    const post = user?.profile?.posts.find((post) => post.id === postId);
    const onSubmit = async (data: ICreatePostForm): Promise<string | void> => {
        return await updatePost(data, post!.id);
    };
    return (
        <PostModal {...modalProps} heading="Редагування публікації">
            {post && (
                <PostForm
                    {...modalProps}
                    defaultValues={{
                        ...post,
                        images: post.images.map((img) => buildImageUrl(img)),
                    }}
                    onSubmit={onSubmit}
                    isPartialForm={true}
                    onSuccess={modalProps.close}
                    
                />
            )}
        </PostModal>
    );
}
