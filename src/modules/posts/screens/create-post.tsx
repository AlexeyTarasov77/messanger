import { ICreatePostForm } from "../types";
import { useUserCtx } from "../../users/components/users-ctx";
import { IModalBaseProps } from "../../main/types";
import { PostForm } from "../components/post-form";
import { PostModal } from "../components/post-modal";

export function CreatePostModal(modalProps: IModalBaseProps) {
  const { addPost } = useUserCtx();
  const onSubmit = async (data: ICreatePostForm): Promise<string | void> => {
    return await addPost(data)
  }
  return (
    <PostModal {...modalProps} heading="Створення публікації">
      <PostForm
        defaultValues={{
          title: "",
          subject: "",
          content: "",
          tags: [],
          images: [],
          links: []
        }}
        onSubmit={onSubmit}
      />
    </PostModal>
  ) 
}
