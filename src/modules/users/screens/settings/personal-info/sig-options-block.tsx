import { useState } from "react";
import { useUserCtx } from "../../../components/users-ctx/context";
import { useForm } from "react-hook-form";
import { IPersonalInfoForm } from "../../../types";
import { Block } from "../block";
import { EditBlock } from "../../../components/ edit-block";

export function SignatureOptionsBlock() {
  const { user, updateUserData } = useUserCtx();
  if (!user) return;
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit } = useForm<IPersonalInfoForm>({
    defaultValues: user,
  });
  const onSubmit = (data: IPersonalInfoForm) => { };
  return (
    <Block>
      <EditBlock
        label="Варiанти пiдпису"
        isEditMode={isEditMode}
        toggleMode={() => setIsEditMode((prev) => !prev)}
        onSave={handleSubmit(onSubmit)}
      />
    </Block>
  );
}
