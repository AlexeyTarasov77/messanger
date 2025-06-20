import { useCreateGroupModal } from "../components/modal-ctx";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";

export function CreateGroupModal() {
  const { visible, close } = useCreateGroupModal();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={close}
      coverScreen={false}
      className="bg-white justify-center items-center rounded-2xl my-auto"
      style={{ maxHeight: "60%" }}
    >
      <ScrollView className="p-4 gap-2 flex-1">
        <View className="w-full flex-row justify-end">
          <ICONS.CloseIcon onPress={close} width={15} height={15} fill="#543C52" />
        </View>

        <Text className="text-xl font-bold mb-4">Нова група</Text>

        <View className="gap-4">
          <Text className="text-center text-gray-500">Дизайн в разработке...</Text>
        </View>

      </ScrollView>
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
