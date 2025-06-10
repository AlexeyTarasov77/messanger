// import { useForm } from "react-hook-form";
// import { IAlbum } from "../types";
// import { getErrorMessage } from "../../../shared/utils/errors";
// import { usersService } from "../services";



// export function AlbumModal() {
//     const {
//         handleSubmit,
//         control,
//         getValues,
//         setError,
//         formState: { errors },
//     } = useForm<IAlbum>({
//         defaultValues: { firstName: "", lastName: "", username: "" },
//     });

//     const { user } = useUserCtx();

//     const { visible, close } = useRegisterModal();
//     console.log("MODAL VISIBLE:", visible);

//     async function onSubmit(data: IAlbum) {
//         try {
//             await usersService.updateUser(data);
//         } catch (err) {
//             setError("root", { message: getErrorMessage(err) });
//             return;
//         } finally {
//             console.log("деталі збережені");
//             close();
//         }
//     }
//     async function closeAndSkip() {
//         if (user) {
//             await AsyncStorage.setItem(
//                 `profile_modal_shown_${user.id}`,
//                 "true"
//             );
//         }
//         close();
//     }

//     return (
//         <Modal
//             isVisible={visible}
//             onBackdropPress={closeAndSkip}
//             coverScreen={false}
//             className="bg-white justify-center items-center rounded-2xl my-auto"
//             style={{ maxHeight: "60%" }}
//         >
//             <View className="  self-center items-center rounded-2xl bg-white px-4 ">
//                 <View className="w-full flex-row justify-end pr-2 pt-4">
//                     <ICONS.CloseIcon
//                         onPress={closeAndSkip}
//                         width={15}
//                         height={15}
//                         fill="#543C52"
//                     />
//                 </View>
//                 <View>
//                     <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
//                         Додай деталі про себе
//                     </Text>
//                 </View>

//                 <View className="self-center gap-10 w-[80%]">
//                     <Controller
//                         control={control}
//                         name="firstName"
//                         rules={{
//                             required: {
//                                 value: true,
//                                 message: "FirstName is required",
//                             },
//                         }}
//                         render={({ field, fieldState }) => {
//                             return (
//                                 <Input
//                                     placeholder="Введіть Ваше ім’я"
//                                     onChange={field.onChange}
//                                     onChangeText={field.onChange}
//                                     value={field.value}
//                                     label="Ім'я"
//                                     autoCorrect={false}
//                                     err={fieldState.error}
//                                     className="h-[42]"
//                                 />
//                             );
//                         }}
//                     />
//                     <Controller
//                         control={control}
//                         name="lastName"
//                         rules={{
//                             required: {
//                                 value: true,
//                                 message: "LastName is required",
//                             },
//                         }}
//                         render={({ field, fieldState }) => {
//                             return (
//                                 <Input
//                                     placeholder="Введіть Ваше прізвище"
//                                     onChange={field.onChange}
//                                     onChangeText={field.onChange}
//                                     value={field.value}
//                                     label="Прізвище"
//                                     autoCorrect={false}
//                                     err={fieldState.error}
//                                     className="h-[42]"
//                                 />
//                             );
//                         }}
//                     />
//                     <Controller
//                         control={control}
//                         name="username"
//                         rules={{
//                             required: {
//                                 value: true,
//                                 message: "Username is required",
//                             },
//                         }}
//                         render={({ field, fieldState }) => {
//                             return (
//                                 <Input
//                                     placeholder="@"
//                                     autoCapitalize="none"
//                                     onChange={field.onChange}
//                                     onChangeText={(text) => {
//                                         field.onChange(
//                                             text
//                                                 .replace(/^@+/, "")
//                                                 .replace(/@/g, "")
//                                         );
//                                     }}
//                                     value={`@${field.value}`}
//                                     // onChangeText={field.onChange}
//                                     // value={field.value}
//                                     label="Ім'я користувача"
//                                     autoCorrect={false}
//                                     err={fieldState.error}
//                                     className="h-[42]"
//                                 />
//                             );
//                         }}
//                     />
//                     <View className="flex-row gap-2 mr-10">
//                         <Text className="h-fit align-top">Або оберіть:</Text>
//                         <Text className="text-green-600 flex-wrap w-[80%]">
//                             (Запропоновані варіанти відповідно до Ім’я та
//                             Прізвища)
//                         </Text>
//                     </View>

//                     {renderError(errors.root)}
//                     <View className="self-end bottom-10">
//                         <Button
//                             label="Продовжити"
//                             onPress={handleSubmit(onSubmit)}
//                             className="h-[40] w-full py-2 px-6 bg-slive border-border rounded-[1234]"
//                         />
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// }
