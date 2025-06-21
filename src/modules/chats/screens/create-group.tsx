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
  const filteredContacts = searchQuery.trim() ?
    contacts.filter(contact => getUserDisplayName(contact).toLowerCase().startsWith(searchQuery.toLowerCase()))
    : contacts
  const onSubmit = () => {
    close()
  };

  if (isLoading) {
    return <Loader />
  }
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

            <View className='border-b border-gray-400 pt-3'>
              <Text className='font-bold'>
                A
              </Text>
            </View>
            {filteredContacts.map(contact => (
              <View key={contact.id} className="flex-row items-center gap-2 p-2 border-b border-gray-400">
                <UserAvatar user={contact} />
                <View className="flex-1">
                  <Text className="font-medium text-lg">{getUserDisplayName(contact)}</Text>
                </View>
                <UICheckbox
                  className="w-4 h-4"
                  value={selectedMembersIds.includes(contact.id)}
                  onValueChange={val => val ?
                    setSelectedMembersIds(prev => [...prev, contact.id]) :
                    setSelectedMembersIds(prev => prev.filter(id => id !== contact.id))
                  }
                />
              </View >
            ))}
            <View className='border-b border-gray-400 pt-3'>
              <Text className='font-bold'>
                Б
              </Text>
            </View>
            {/* <GroupCreateCard */}
            {/*   user={{ */}
            {/*     username: "Cameron_Williamson_21", */}
            {/*     firstName: "Cameron", */}
            {/*     lastName: "Williamson", */}
            {/*     isOnline: true, */}
            {/*     avatarUrl: "https://images.techinsider.ru/upload/img_cache/b6b/b6b4cf32e62c8173690062d1df041b33_cropped_510x510.webp" */}
            {/*   }} */}
            {/*   isInGroup={false} */}
            {/* /> */}
            {/* <GroupCreateCard */}
            {/*   user={{ */}
            {/*     username: "Cameron_Williamson_21", */}
            {/*     firstName: "Cameron", */}
            {/*     lastName: "Williamson", */}
            {/*     isOnline: true, */}
            {/*     avatarUrl: "https://img.ixbt.site/live/images/original/31/96/01/2023/11/28/cc4a5af0af.jpg?w=877" */}
            {/*   }} */}
            {/*   isInGroup={true} */}
            {/* /> */}

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
// export function CreateGroupModal() {
//   const { visible, close } = useCreateGroupModal()
//   // const { addGroup } = useUserCtx()
//   // images contains array of base64 encoded selected images
//   const [images, setImages] = useState<GroupMedia[]>([]);
//   const {
//     handleSubmit,
//     control,
//     setError,
//     getValues,
//     formState: { errors },
//   } = useForm<ICreateGroupForm>({
//     defaultValues: {
//       name: "",
//       avatarUrl: "",
//     },
//   });

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permission.status !== "granted") {
//       alert("Permission required to access media");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: "images",
//       base64: true,
//     });

//     // if (!result.canceled && result.assets) {
//     //   // Добавляем новые URI к уже выбранным фото
//     //   setImages(prev => [...prev, ...result.assets.map(asset => ({ url: String(asset.uri), type: asset.type as GroupMedia}))]);
//     // }
//   };

//   const onSubmit = async (data: ICreateGroupForm) => {
//     data.media = images
//     // const errMsg = await addGroup(data)
//     // if (errMsg) {
//     //   return setError("root", { message: errMsg })
//     // }
//     close()
//   };

//   return (
//     <Modal isVisible={visible} onBackdropPress={close} coverScreen={false} className="bg-white justify-center items-center rounded-2xl my-auto" style={{ maxHeight: "60%" }}>
//       <ScrollView className="p-4 gap-2 flex-1">
//         <View className="w-full flex-row justify-end">
//           <ICONS.CloseIcon onPress={close} width={15} height={15} fill="#543C52" />
//         </View>
//         <Text className="text-xl font-bold">
//           Нова група
//         </Text>
//         <View className="gap-4">

//           <View
//             style={{ minHeight: 1, maxHeight: 288 }}
//             className="mt-2 mb-3 rounded-3xl justify-center"
//           >
//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//               {images.map((imageData, index) => (
//                 <View key={index} className="mr-2 relative">
//                   <Image
//                     source={{ uri: imageData.url }}
//                     className="h-72 w-72 rounded-3xl"
//                     resizeMode="cover"
//                   />
//                   <View className="absolute w-10 h-10 bg-white top-3 right-3 border rounded-full justify-center items-center">
//                     <TouchableOpacity onPress={() => setImages(images.filter(img => img.url != imageData.url))}>
//                       <ICONS.BinIcon width={20} height={20} />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//         {renderError(errors.root)}
//         <View className="flex-row justify-end gap-2">
//           <TouchableOpacity onPress={pickImage} className="border border-plum p-2 rounded-3xl">
//             <ICONS.ImageIcon />
//           </TouchableOpacity>
//           <TouchableOpacity className="border border-plum  p-2 rounded-3xl">
//             <ICONS.SmileyIcon />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleSubmit(onSubmit)}
//             className="flex-row items-center gap-1 bg-plum p-2 rounded-2xl">
//             <Text className="text-white text-center pl-3 pr-3">Публікація</Text>
//             <ICONS.SendPostIcon width={20} height={20} />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </Modal>
//   );
// }
