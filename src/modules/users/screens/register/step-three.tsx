import { View, Text, Alert } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepThree, IUser } from "../../types";
import { usersService } from "../../services";
import { getErrorMessage, renderError } from "../../../../shared/utils/errors";
import Modal from "react-native-modal";
import { ICONS } from "../../../../shared/ui/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserCtx } from "../../components/users-ctx";
import { IModalBaseProps } from "../../../main/types";

export function RegisterStepThree({ close, isVisible }: IModalBaseProps) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IRegisterStepThree>({
    defaultValues: { first_name: "", last_name: "", username: "" },
  });

  const { user, updateUserData } = useUserCtx();

  async function onSubmit(data: IRegisterStepThree) {
    try {
      const updatedUser = await usersService.updateUser(data);
      updateUserData({ ...user, ...updatedUser })
    } catch (err) {
      setError("root", { message: getErrorMessage(err) });
      return;
    } finally {
      console.log("деталі збережені:", data);
      Alert.alert("Деталі збережені")
      close();
    }
  }
  async function closeAndSkip() {
    if (user) {
      await AsyncStorage.setItem(`profile_modal_shown_${user.id}`, "true");
    }
    close();
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeAndSkip}
      coverScreen={false}
      className="bg-white justify-center items-center rounded-2xl my-auto"
      style={{ maxHeight: "60%" }}
    >
      <View className="  self-center items-center rounded-2xl bg-white px-4 ">
        <View className="w-full flex-row justify-end pr-2 pt-4">
          <ICONS.CloseIcon
            onPress={closeAndSkip}
            width={15}
            height={15}
            fill="#543C52"
          />
        </View>
        <View>
          <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
            Додай деталі про себе
          </Text>
        </View>

        <View className="self-center gap-10 w-[80%]">
          <Controller
            control={control}
            name="first_name"
            rules={{
              required: {
                value: true,
                message: "FirstName is required",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="Введіть Ваше ім’я"
                  onChange={field.onChange}
                  onChangeText={field.onChange}
                  value={field.value}
                  label="Ім'я"
                  autoCorrect={false}
                  err={fieldState.error}
                  className="h-[42]"
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
                message: "LastName is required",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="Введіть Ваше прізвище"
                  onChange={field.onChange}
                  onChangeText={field.onChange}
                  value={field.value}
                  label="Прізвище"
                  autoCorrect={false}
                  err={fieldState.error}
                  className="h-[42]"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="username"
            rules={{
              required: {
                value: true,
                message: "Username is required",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  placeholder="@"
                  autoCapitalize="none"
                  onChange={field.onChange}
                  //   onChangeText={(text) => {
                  //     field.onChange(text.replace(/^@+/, "").replace(/@/g, ""));
                  //   }}
                  //   value={`@ ${field.value}`}
                  onChangeText={field.onChange}
                  value={field.value}
                  label="Ім'я користувача"
                  autoCorrect={false}
                  err={fieldState.error}
                  className="h-[42]"
                />
              );
            }}
          />
          <View className="flex-row gap-2 mr-10">
            <Text className="h-fit align-top">Або оберіть:</Text>
            <Text className="text-green-600 flex-wrap w-[80%]">
              (Запропоновані варіанти відповідно до Ім’я та Прізвища)
            </Text>
          </View>

          {renderError(errors.root)}
          <View className="self-end bottom-10">
            <Button
              label="Продовжити"
              onPress={handleSubmit(onSubmit)}
              className="h-[40] w-full py-2 px-6 bg-slive border-border rounded-[1234]"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
