import { useState } from "react";
import { useUserCtx } from "../../../components/users-ctx";
import { useForm } from "react-hook-form";
import { IPersonalInfoForm } from "../../../types";
import { Block } from "../block";
import { EditBlock } from "../../../components/ edit-block";
import { Checkbox } from "expo-checkbox";
import { Text } from "react-native"

export function SignatureOptionsBlock() {
    const { user, updateUserData } = useUserCtx();
    if (!user) return;
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const { control, handleSubmit } = useForm<IPersonalInfoForm>({
        defaultValues: user,
    });
    const onSubmit = (data: IPersonalInfoForm) => {};
    return (
        <Block>
            <EditBlock
                label="Варiанти пiдпису"
                isEditMode={isEditMode}
                toggleMode={() => setIsEditMode((prev) => !prev)}
                onSave={handleSubmit(onSubmit)}
            />
            {/* {isEditMode ? (
                <>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        className="color-darkBlue"
                        //   style={styles.checkbox}
                    />
                    <Text></Text>
                </>
            ) : (
                <>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelection}
                        className="color-border"
                        //   style={styles.checkbox}
                    />
                </>
            )} */}
        </Block>
    );
}
