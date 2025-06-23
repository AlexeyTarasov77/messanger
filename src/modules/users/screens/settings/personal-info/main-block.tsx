import { View, Alert } from "react-native";
import { useUserCtx } from "../../../components/users-ctx";
import { EditBlock } from "../../../components/ edit-block";
import { useState } from "react";
import { IPersonalInfoForm } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../shared/ui/input";
import { usersService } from "../../../services";
import { getErrorMessage } from "../../../../../shared/utils/errors";
import { formatDate } from "../../../../../shared/utils/dates";
import { Block } from "../block";
import dayjs from "dayjs";


export function MainBlock() {
  const { user, updateUserData } = useUserCtx();
  if (!user) return;
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit, setError } = useForm<IPersonalInfoForm>({
    defaultValues: {
      ...user,
      date_of_birth: formatDate(new Date(user.profile.date_of_birth), "%d-%m-%YYYY")
    },
  });
  const onSubmit = async (data: IPersonalInfoForm) => {
    try {
      const format = "DD-MM-YYYY"
      const date = data.date_of_birth ? dayjs(data.date_of_birth, format) : undefined
      if (!date?.isValid()) {
        setError("date_of_birth", { message: "Invalid date! Specify date in format: " + format })
        return
      }
      const updatedUser = await usersService.updateUser({ ...data, date_of_birth: date });
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
          name="first_name"
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
              />
            );
          }}
        />

        <Controller
          control={control}
          name="last_name"
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
              />
            );
          }}
        />

        <Controller
          control={control}
          name="date_of_birth"
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
                label="Дата народження"
                autoCorrect={false}
                err={fieldState.error}
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
              />
            );
          }}
        />
      </View>
    </Block>
  );
}
