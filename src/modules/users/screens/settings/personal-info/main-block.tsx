import { View, Alert } from "react-native";
import { useUserCtx } from "../../../components/users-ctx/context";
import { EditBlock } from "../../../components/ edit-block";
import { useState } from "react";
import { IPersonalInfoForm } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../shared/ui/input";
import { usersService } from "../../../services";
import { getErrorMessage } from "../../../../../shared/utils/errors";
import { formatDate } from "../../../../../shared/utils/dates";
import { Block } from "../block";


export function MainBlock() {
  const { user, updateUserData } = useUserCtx();
  if (!user) return;
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit } = useForm<IPersonalInfoForm>({
    defaultValues: user,
  });
  const onSubmit = async (data: IPersonalInfoForm) => {
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
    <Block className="gap-6">
      <EditBlock
        label="Особиста iнформацiя"
        isEditMode={isEditMode}
        toggleMode={() => setIsEditMode((prev) => !prev)}
        onSave={handleSubmit(onSubmit)}
      />
      <View className="gap-4">
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={field.value}
                label="Iм'я"
                autoCorrect={false}
                err={fieldState.error}
                className="px-4 py-3 rounded-xl"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={field.value}
                label="Прізвище"
                autoCorrect={false}
                err={fieldState.error}
                className="px-4 py-3 rounded-xl"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="birthDate"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={formatDate(new Date(field.value!), "%d-%m-%YYYY")}
                label="Дата народження"
                autoCorrect={false}
                err={fieldState.error}
                className="px-4 py-3 rounded-xl"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: {
              value: true,
              message: "Це поле обов'язкове",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                disabled={!isEditMode}
                onChange={field.onChange}
                onChangeText={field.onChange}
                value={field.value}
                label="Електронна адреса"
                autoCorrect={false}
                err={fieldState.error}
                className="px-4 py-3 rounded-xl"
              />
            );
          }}
        />
      </View>
    </Block>
  );
}
