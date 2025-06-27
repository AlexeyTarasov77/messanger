import { useState } from "react";
import { EditBlock } from "../../../components/ edit-block";
import { useUserCtx } from "../../../components/users-ctx";
import { Block } from "../block";
import { Controller, useForm } from "react-hook-form";
import { IPasswordForm, IPersonalInfoForm } from "../../../types";
import { Input } from "../../../../../shared/ui/input";
import { Alert, View } from "react-native";
import { usersService } from "../../../services";
import { getErrorMessage } from "../../../../../shared/utils/errors";

export function PasswordBlock() {
    const { user, updateUserData } = useUserCtx();
    if (!user) return;
    const [isEditMode, setIsEditMode] = useState(false);
    const { control, handleSubmit, setError, getValues } = useForm<IPasswordForm>({
        defaultValues: { password: "", confirm_password: "" },
    });

    const onSubmit = async (data: IPasswordForm) => {
        try {
              const updatedUser = await usersService.updateUser(data);
              updateUserData(updatedUser);
            } catch (err) {
              Alert.alert("Update failure", getErrorMessage(err));
              return;
            }
        setIsEditMode(false);
      };

    return (
        <Block className="">
            <EditBlock
                label={"Пароль"}
                isEditMode={isEditMode}
                toggleMode={() => setIsEditMode((prev) => !prev)}
                onSave={handleSubmit(onSubmit)}
            />
            <View className="gap-4">
        <Controller
          control={control}
          name="password"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input.Password
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={field.value}
                label="Новий пароль"
                autoCorrect={false}
                err={fieldState.error}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="confirm_password"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
            validate: (value) => value === getValues("password"),
          }}
          render={({ field, fieldState }) => {
            return (
              <Input.Password
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={field.value}
                label="Підтвердіть новий пароль"
                autoCorrect={false}
                err={fieldState.error}
              />
            );
          }}
        />
        </View>
        </Block>
    );
}
