import { Image, View, Text, Alert } from "react-native";
import { useUserCtx } from "../../components/users-ctx/context";
import { DEFAULT_AVATAR_URL } from "../../../../shared/constants";
import { getUserDisplayName } from "../../utils";
import { EditBlock } from "../../components/ edit-block";
import { ReactNode, useState } from "react";
import { IPersonalInfoForm } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { usersService } from "../../services";
import { getErrorMessage } from "../../../../shared/utils/errors";
import { formatDate } from "../../../../shared/utils/dates";

const Block = ({ children, className }: { children: ReactNode, className?: string }) => {
  return <View className={`bg-white p-4 rounded-xl border-border ${className}`}>
    {children}
  </View>
}

function MainBlock() {
  const { user, updateUserData } = useUserCtx()
  if (!user) return
  const [isEditMode, setIsEditMode] = useState(false)
  const { control, handleSubmit } = useForm<IPersonalInfoForm>({ defaultValues: user })
  const onSubmit = async (data: IPersonalInfoForm) => {
    try {
      const updatedUser = await usersService.updateUser(data)
      updateUserData(updatedUser)
    } catch (err) {
      Alert.alert("Update failure", getErrorMessage(err))
      return
    }
    setIsEditMode(false)
  }
  return (
    <Block className="gap-6">
      <EditBlock label="Особиста iнформацiя" isEditMode={isEditMode} toggleMode={() => setIsEditMode(prev => !prev)} onSave={handleSubmit(onSubmit)} />
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
  )
}

function SignatureOptionsBlock() {
  const { user, updateUserData } = useUserCtx()
  if (!user) return
  const [isEditMode, setIsEditMode] = useState(false)
  const { control, handleSubmit } = useForm<IPersonalInfoForm>({ defaultValues: user })
  const onSubmit = (data: IPersonalInfoForm) => {

  }
  return (
    <Block className="gap-4">
      <EditBlock label="Варiанти пiдпису" isEditMode={isEditMode} toggleMode={() => setIsEditMode(prev => !prev)} onSave={handleSubmit(onSubmit)} />
    </Block>
  )
}

function ProfileCardBlock() {
  const { user, updateUserData } = useUserCtx()
  if (!user) return
  const [isEditMode, setIsEditMode] = useState(false)
  const { control, handleSubmit } = useForm<IPersonalInfoForm>({ defaultValues: user })
  const onSubmit = (data: IPersonalInfoForm) => {

  }
  return (
    <Block className="gap-4">
      <EditBlock label="Картка профiлю" isEditMode={isEditMode} toggleMode={() => setIsEditMode(prev => !prev)} onSave={handleSubmit(onSubmit)} />
      <View className="gap-6 items-center justify-center">
        <View>
          <Image
            source={{ uri: user.avatarUrl || DEFAULT_AVATAR_URL }}
            className="w-24 h-24 rounded-full"
          />
        </View>
        <View className="gap-3 justify-between items-center">
          <View ><Text className="font-bold text-darkBlue text-2xl">{getUserDisplayName(user)}</Text></View>
          {user.username &&
            <View ><Text className="text-lg text-darkBlue">@{user.username}</Text></View>
          }
        </View>
      </View>

    </Block>
  )
}

export function PersonalInfo() {
  const { user } = useUserCtx()
  if (!user) return
  return (
    <View className="gap-2">
      <ProfileCardBlock />
      <MainBlock />
      <SignatureOptionsBlock />
    </View>
  )
}
