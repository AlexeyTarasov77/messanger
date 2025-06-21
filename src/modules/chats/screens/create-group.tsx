import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../shared/ui/input/input";
import { ICreateGroupForm, GroupMedia } from "../types";
import { renderError } from "../../../shared/utils/errors";
import { useCreateGroupModal } from "../components/modal-ctx";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";
import { UserAvatar } from '../../users/components/avatar';
import { getUserDisplayName } from '../../users/utils';
import { UICheckbox } from '../../../shared/ui/checkbox/checkbox';
import { Loader } from '../../../shared/ui/loader/loader';
import { useAllFriends } from '../../friends/hooks/use-all-friends';
import { IUser } from '../../users/types';

export function CreateGroupModal() {
  const { visible, close } = useCreateGroupModal()
  const [selectedMembersIds, setSelectedMembersIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { allFriends: contacts, isLoading } = useAllFriends()
  if (isLoading) {
    return <Loader />
  }
  const filteredContacts = searchQuery.trim() ?
    contacts.filter(contact => getUserDisplayName(contact).toLowerCase().startsWith(searchQuery.toLowerCase()))
    : contacts
  const onSubmit = () => {
    close()
  };
  const groupedContacts: Record<string, IUser[] | undefined> = {}
  filteredContacts.forEach(contact => {
    const firstLetter = getUserDisplayName(contact)[0].toUpperCase()
    if (groupedContacts[firstLetter] === undefined) {
      groupedContacts[firstLetter] = []
    }
    groupedContacts[firstLetter].push(contact)
  })
  return (
    <Modal isVisible={visible} onBackdropPress={close} coverScreen={false} className="bg-white justify-center items-center rounded-2xl my-auto" style={{ maxHeight: "60%" }}>
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
            placeholder="Пошук"
            autoCapitalize="none"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
            autoCorrect={false}
            className="h-[42]"
          />
          <Text className='color-grey '>
            Вибрано: {selectedMembersIds.length}
          </Text>
          <ScrollView className='max-h-60'>
            {Object.entries(groupedContacts).map(([letter, contacts]) => (
              <View key={letter}>
                <View className="border-b border-gray-400 pt-3">
                  <Text className="font-bold">{letter}</Text>
                </View>
                {contacts?.map(contact => (
                  <View key={contact.id} className="flex-row items-center gap-2 p-2 border-b border-gray-400">
                    <UserAvatar user={contact} />
                    <View className="flex-1">
                      <Text className="font-medium text-lg">{getUserDisplayName(contact)}</Text>
                    </View>
                    <UICheckbox
                      className="w-4 h-4"
                      value={selectedMembersIds.includes(contact.id)}
                      onValueChange={val => val
                        ? setSelectedMembersIds(prev => [...prev, contact.id])
                        : setSelectedMembersIds(prev => prev.filter(id => id !== contact.id))
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="flex-row justify-end gap-2">
          <TouchableOpacity
            onPress={close}
            className="border border-plum  p-2 rounded-3xl">
            <Text className="text-plum text-center pl-3 pr-3">Скасувати</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSubmit}
            className="flex-row items-center gap-1 bg-slive p-2 rounded-2xl">
            <Text className="text-white text-center pl-3 pr-3">Далі</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
