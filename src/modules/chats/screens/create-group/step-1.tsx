import { IUser } from '../../../users/types';
import { IModalBaseProps } from "../../../main/types";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { MembersSelectionModal } from "../../components/members-selection-modal";

export function CreateGroupModalStep1(modalProps: IModalBaseProps) {
  const { open } = useModal()
  const onSubmit = async (selectedMembers: IUser[]) => {
    if (!selectedMembers.length) {
      return "Виберiть хоча б одного участника!"
    }
    modalProps.close()
    open({ name: ModalName.CREATE_CHAT_STEP_2, props: { selectedMembers } })
  };
  return <MembersSelectionModal
    {...modalProps}
    heading="Нова група"
    confirmBtnLabel="Далі"
    onSubmit={onSubmit}
  />
}
