import { Modal } from "react-native";
import { getErrorMessage } from "../../../../shared/utils/errors";
import { IModalBaseProps } from "../../../main/types";
import { GroupCreateOrUpdateModal } from "../../components/group-modal";
import { chatsService } from "../../services/chats";
import { ChatGroupWithMembers, CreateGroupStep2Data } from "../../types";
import { ModalName } from "../../../../shared/context/modal";

export function UpdateGroupModal({ chat, setChat, ...modalProps }: IModalBaseProps & { chat?: ChatGroupWithMembers, setChat?: React.Dispatch<React.SetStateAction<ChatGroupWithMembers | null>> }) {
  const onSubmit = async (data: CreateGroupStep2Data) => {
    if (!chat || !setChat) throw new Error("Missing required props!")
    try {
      const updatedChat = await chatsService.updateChat(data, chat.id)
      setChat({ ...chat, ...updatedChat, members: data.selectedMembers })
      modalProps.close()
    } catch (err) {
      return getErrorMessage(err)
    }
  };
  return (
    <GroupCreateOrUpdateModal
      defaultValues={{ selectedMembers: chat?.members || [], name: chat?.name || "", avatar: chat?.avatar || "" }}
      {...modalProps}
      name={ModalName.UPDATE_CHAT}
      onSubmit={onSubmit}
      onCancel={modalProps.close}
    />
  )
}
