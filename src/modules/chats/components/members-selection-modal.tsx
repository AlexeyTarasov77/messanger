import { IModalBaseProps } from "../../main/types";
import { IUser } from "../../users/types";
import { Input } from "../../../shared/ui/input/input";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";
import { UserAvatar } from '../../users/components/avatar';
import { getUserDisplayName } from '../../users/utils';
import { UICheckbox } from '../../../shared/ui/checkbox/checkbox';
import { Loader } from '../../../shared/ui/loader/loader';
import { RoundedButton } from '../../../shared/ui/button/button';
import { renderError } from "../../../shared/utils/errors";
import { useAllFriends } from "../../friends/hooks/use-all-friends";
import { useSocketCtx } from "../../users/components/users-ctx";

export function MembersSelectionModal({ heading, confirmBtnLabel, onSubmit, close, isVisible }: IModalBaseProps & { heading: string, confirmBtnLabel: string, onSubmit: (selectedMembers: IUser[]) => Promise<string | void> }) {
  const { checkUserOnline } = useSocketCtx()
  const [selectedMembers, setSelectedMembers] = useState<IUser[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [error, setError] = useState("")
  const { allFriends: contacts, isLoading } = useAllFriends()
  if (isLoading) {
    return <Loader />
  }
  const filteredContacts = searchQuery.trim() ?
    contacts.filter(contact => getUserDisplayName(contact).toLowerCase().startsWith(searchQuery.toLowerCase()))
    : contacts
  const handleSubmit = async () => {
    const errMsg = await onSubmit(selectedMembers)
    if (errMsg) {
      return setError(errMsg)
    }
  };
  const onCancel = () => {
    setSelectedMembers([])
    setSearchQuery("")
    close()
  }
  const groupedContacts: Record<string, IUser[] | undefined> = {}
  filteredContacts.forEach(contact => {
    const firstLetter = getUserDisplayName(contact)[0].toUpperCase()
    if (groupedContacts[firstLetter] === undefined) {
      groupedContacts[firstLetter] = []
    }
    groupedContacts[firstLetter].push(contact)
  })
  // sort contacts alphabetically by the first letter (contacts starting from A should go before B, before C, etc ...)
  const sortedContacts = Object.entries(groupedContacts).sort(([letter1, _], [letter2, __]) => {
    if (letter1 < letter2) {
      return -1;
    }
    if (letter1 > letter2) {
      return 1;
    }
    return 0;
  })
  return (
    <Modal isVisible={isVisible} onBackdropPress={close} coverScreen={false} className="bg-white justify-center items-center rounded-2xl my-auto" style={{ maxHeight: "60%" }}>
      <View className="pr-9 pl-9 p-6 flex-1 ">

        <View className='gap-4'>
          <View className="w-full flex-row justify-end">
            <ICONS.CloseIcon onPress={close} width={15} height={15} fill="#543C52" />
          </View>
          <View className='justify-center items-center w-full'>
            <Text className="text-3xl font-bold">
              {heading}
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
            Вибрано: {selectedMembers.length}
          </Text>
          <ScrollView className='max-h-64'>
            {sortedContacts.map(([letter, contacts]) => (
              <View key={letter}>
                <View className="border-b border-gray-400 pt-3">
                  <Text className="font-bold">{letter}</Text>
                </View>
                {contacts?.map(contact => (
                  <View key={contact.id} className="flex-row items-center gap-2 p-2 border-b border-gray-400">
                    <UserAvatar user={contact} isUserOnline={checkUserOnline(contact.id)} className="w-12 h-12" />
                    <View className="flex-1">
                      <Text className="font-medium text-lg">{getUserDisplayName(contact)}</Text>
                    </View>
                    <UICheckbox
                      className="w-4 h-4"
                      value={selectedMembers.includes(contact)}
                      onValueChange={val => val
                        ? setSelectedMembers(prev => [...prev, contact])
                        : setSelectedMembers(prev => prev.filter(selectedContact => selectedContact.id !== contact.id))
                      }
                    />
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        {error && renderError(error)}
        <View className="flex-row justify-end gap-2">
          <RoundedButton className="py-0" onPress={onCancel} label="Скасувати" />
          <RoundedButton className="py-0" onPress={handleSubmit} label={confirmBtnLabel} filled darkFill />
        </View>
      </View>
    </Modal>
  );
}
