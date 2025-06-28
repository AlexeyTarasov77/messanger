import { IUser } from '../../../users/types';
import { IModalBaseProps } from "../../../main/types";
import { chatsService } from "../../services/chats";
import { getErrorMessage } from "../../../../shared/utils/errors";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { useRouter } from "expo-router";
import { GroupCreateOrUpdateModal } from "../../components/group-modal";
import { CreateGroupStep2Data } from "../../types";


export function CreateGroupModalStep2({ selectedMembers, ...modalProps }: IModalBaseProps & { selectedMembers?: IUser[] }) {
  const { open } = useModal()
  const router = useRouter()
  const onSubmit = async (data: CreateGroupStep2Data) => {
    try {
      const chat = await chatsService.createChat({ ...data, is_personal_chat: false })
      modalProps.close()
      router.push(`/chats/groups/${chat.id}`)
    } catch (err) {
      return getErrorMessage(err)
    }
  };
  return (
    <GroupCreateOrUpdateModal
      defaultValues={{ selectedMembers: selectedMembers || [], name: "", avatar: "" }}
      {...modalProps}
      name={ModalName.CREATE_CHAT_STEP_2}
      onSubmit={onSubmit} onCancel={() => {
        modalProps.close()
        open({ name: ModalName.CREATE_CHAT_STEP_1 })
      }} />
  )
}
