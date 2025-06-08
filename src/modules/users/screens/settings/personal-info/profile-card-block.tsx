import { useState } from "react";
import { useUserCtx } from "../../../components/users-ctx/context";
import { Controller, useForm } from "react-hook-form";
import { IProfileCardForm } from "../../../types";
import { usersService } from "../../../services";
import { getErrorMessage } from "../../../../../shared/utils/errors";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { pickImage } from "../../../../../shared/utils/images";
import { Block } from "./block";
import { EditBlock } from "../../../components/ edit-block";
import { ICONS } from "../../../../../shared/ui/icons";
import { getUserDisplayName } from "../../../utils";
import { DEFAULT_AVATAR_URL } from "../../../../../shared/constants";
import { Input } from "../../../../../shared/ui/input";

export function ProfileCardBlock() {
  const { user, updateUserData } = useUserCtx();
  if (!user) return;
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<IProfileCardForm>({
    defaultValues: { ...user, avatarUrl: "" },
  });
  const onSubmit = async (data: IProfileCardForm) => {
    try {
      const updatedUser = await usersService.updateUser(data);
      updateUserData(updatedUser);
    } catch (err) {
      Alert.alert("Update failure", getErrorMessage(err));
      return;
    }
    setIsEditMode(false);
  };
  const pickProfileImage = async () => {
    const result = await pickImage({
      mediaTypes: "images",
    });
    if (result && !result.canceled) {
      setValue("avatarUrl", result.assets[0].uri);
    }
  };
  const userAvatarUrl = user.avatarUrl || DEFAULT_AVATAR_URL
  return (
    <Block className="gap-4">
      <EditBlock
        label="Картка профiлю"
        isEditMode={isEditMode}
        toggleMode={() => setIsEditMode((prev) => !prev)}
        onSave={handleSubmit(onSubmit)}
      />
      <View className="gap-6 items-center justify-center">
        <View className="relative">
          {/* using watch in Image.source instead of getValues().avatarUrl 
          because value in getValues().avatarUrl does not get immediately updated on setValue */}
          <Image
            source={{ uri: watch("avatarUrl") || userAvatarUrl }}
            className={`w-24 h-24 rounded-full ${isEditMode ? "opacity-60" : ""}`}
          />
          {isEditMode && (
            <TouchableOpacity className="absolute top-4 left-4" onPress={pickProfileImage}>
              <ICONS.SearchIcon svg={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          )}
        </View>
        <View className="gap-3 justify-between items-center">
          <View>
            <Text className="font-bold text-darkBlue text-2xl">
              {getUserDisplayName(user)}
            </Text>
          </View>
          {user.username && isEditMode ? (
            <Controller
              control={control}
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "Це поле обов'язкове",
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    onChange={field.onChange}
                    onChangeText={field.onChange}
                    value={field.value}
                    autoCorrect={false}
                    err={fieldState.error}
                  />
                );
              }}
            />
          ) : (
            <View>
              <Text className="text-lg text-darkBlue">@{user.username}</Text>
            </View>
          )}
        </View>
      </View>
    </Block>
  );
}
