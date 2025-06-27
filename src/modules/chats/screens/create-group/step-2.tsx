import { Input } from "../../../../shared/ui/input/input";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../../shared/ui/icons";
import { UserAvatar } from '../../../users/components/avatar';
import { getUserDisplayName } from '../../../users/utils';
import { IUser } from '../../../users/types';
import { RoundedButton } from '../../../../shared/ui/button/button';
import { IModalBaseProps } from "../../../main/types";
import { chatsService } from "../../services/chats";
import { getErrorMessage, renderError } from "../../../../shared/utils/errors";
import { DEFAULT_AVATAR_URL } from "../../../../shared/constants";
import { pickImage } from "../../../../shared/utils/images";
import { ModalName, useModal } from "../../../../shared/context/modal";
import { TextBtn } from "../../../../shared/ui/button";


export function CreateGroupModalStep2({ close, isVisible, selectedMembers: prevSelectedMembers }: IModalBaseProps & { selectedMembers?: IUser[] }) {
  const { open } = useModal()
  const [selectedMembers, setSelectedMembers] = useState<IUser[]>([])
  useEffect(() => {
    prevSelectedMembers && setSelectedMembers(prevSelectedMembers)
  }, [prevSelectedMembers])
  const [chatName, setChatName] = useState<string>("")
  const [chatPhoto, setChatPhoto] = useState<string>("")
  const [error, setError] = useState("")
  const onSubmit = async () => {
    try {
      await chatsService.createChat({ name: chatName, avatar: chatPhoto, selectedMembers, is_personal_chat: false })
      close()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  };
  const pickChatPhoto = async () => {
    const result = await pickImage({
      mediaTypes: "images",
      allowsMultipleSelection: false,
    });
    if (result && !result.canceled && result.assets) {
      setChatPhoto(result.assets[0].uri)
    }
  }
  return (
    <Modal isVisible={isVisible} onBackdropPress={close} coverScreen={false} className="bg-white justify-center items-center rounded-2xl my-auto" style={{ maxHeight: "60%" }}>
      <View className="pr-9 pl-9 p-6 flex-1 ">

        <View className='gap-4'>
          <View className="w-full flex-row justify-end">
            <ICONS.CloseIcon onPress={close} width={15} height={15} fill="#543C52" />
          </View>
          <View className='justify-center items-center w-full'>
            <Text className="text-3xl font-bold">
              Нова група
            </Text>
          </View>

          <Input.InputSearch
            placeholder="Введіть назву"
            autoCapitalize="none"
            label="Назва"
            onChangeText={(text) => setChatName(text)}
            value={chatName}
            autoCorrect={false}
            className="h-[42]"
          />
          <View className="gap-6 items-center justify-center">
            <Image source={{ uri: chatPhoto || DEFAULT_AVATAR_URL }} className="rounded-full w-12 h-12" />
            <View className="gap-6 flex-row">
              <TextBtn label="Додайте фото" Icon={ICONS.PostsIcon} onPress={pickChatPhoto} />
              <TextBtn label="Оберіть фото" Icon={ICONS.PostsIcon} onPress={pickChatPhoto} />
            </View>
          </View>
          <Text className="text-lg">
            Учасники
          </Text>
          <ScrollView className='max-h-60'>
            {selectedMembers.map(contact => (
              <View key={contact.id} className="flex-row items-center gap-2 p-2 border-b border-gray-400">
                <UserAvatar user={contact} />
                <View className="flex-1">
                  <Text className="font-medium text-lg">{getUserDisplayName(contact)}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedMembers(prev => prev.filter(selectedContact => selectedContact.id !== contact.id))}><ICONS.BinIcon width={20} height={20} /></TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        {error && renderError(error)}
        <View className="flex-row justify-end gap-2">
          <RoundedButton className="py-0" onPress={() => {
            close()
            open({ name: ModalName.CREATE_CHAT_STEP_1 })
          }} label="Назад" />
          <RoundedButton className="py-0" onPress={onSubmit} label="Створити групу" filled darkFill />
        </View>
      </View>
    </Modal>
  );
}
