
import { IUser } from '../../../users/types';
import { IModalBaseProps } from "../../../main/types";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { MembersSelectionModal } from "../../components/members-selection-modal";
import { chatsService } from '../../services/chats';

export function AddGroupMemberModal({ chatId, close, ...modalProps }: IModalBaseProps & { chatId?: number }) {
  const { open } = useModal()
  const onSubmit = async (selectedMembers: IUser[]) => {
    if (!chatId) throw new Error("AddGroupMemberModal chatId is missing in props")
    if (!selectedMembers.length) {
      return "Виберiть хоча б одного участника!"
    }
    close()
    await chatsService.updateChat({ members: selectedMembers }, chatId)
    open({ name: ModalName.CREATE_CHAT_STEP_2, props: { selectedMembers } })
  };
  return <MembersSelectionModal
    close={close}
    {...modalProps}
    heading="Додати учасника"
    confirmBtnLabel="Зберегти"
    onSubmit={onSubmit}
  />
}
