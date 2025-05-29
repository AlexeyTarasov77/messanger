import { View, Text } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepOne, IRegisterStepThree, IUser } from "../../types";
import { useRouter } from "expo-router";
import { authService } from "../../services";
import { getErrorMessage, renderError } from "../../../../shared/utils/errors";
import { ScrollView } from "react-native-gesture-handler";
import { useCreatePostModal } from "../../../posts/components";
import Modal from "react-native-modal";
import { useRegisterModal } from "../../components/modal-ctx";

export function RegisterStepThree() {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        getValues,
        setError,
        formState: { errors },
    } = useForm<IRegisterStepThree>({
        defaultValues: { username: "", firstName: "", lastName: "" },
    });

    const { visible, close } = useRegisterModal();
    async function onSubmit() {
        // data: IUser
        // try {
        //     await authService.register(data.email);
        // } catch (err) {
        //     setError("root", { message: getErrorMessage(err) });
        //     return;
        // }
        console.log("Деталі відправились на бек");
    }

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={close}
            coverScreen={false}
            className="bg-white justify-center items-center rounded-2xl my-auto"
            style={{ maxHeight: "60%" }}
        >
            <ScrollView className="h-full pt-10 bg-mainBg">
                <View className="self-center items-center rounded-2xl bg-white px-4 py-12">
                    {/* <View className="flex-row gap-4 justify-center">
                        <View>
                            <Text className="font-bold text-2xl color-darkBlue border-b">
                                Peєстрація
                            </Text>
                        </View>
                        <View>
                            <Link href="/users/login" asChild>
                                <Text className="font-bold text-2xl color-grey ">
                                    Авторизація
                                </Text>
                            </Link>
                        </View>
                    </View> */}
                    <View>
                        <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
                            Додай деталі про себе
                        </Text>
                    </View>

                    <View className="self-center gap-10 w-[80%]">
                        <Controller
                            control={control}
                            name="firstName"
                            rules={{
                                required: {
                                    value: true,
                                    message: "FirstName is required",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input.Password
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
                            name="lastName"
                            rules={{
                                required: {
                                    value: true,
                                    message: "LastName is required",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input.Password
                                        placeholder="Повтори пароль"
                                        onChange={field.onChange}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label="Підтверди пароль"
                                        autoCorrect={false}
                                        err={fieldState.error}
                                        className="h-[42] flex-1"
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
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label=""
                                        autoCorrect={false}
                                        err={fieldState.error}
                                        className="h-[42] w-full"
                                    />
                                );
                            }}
                        />
                        <View>
                            <Text>Або оберіть:</Text>
                            <Text>
                                (Запропоновані варіанти відповідно до Ім’я та
                                Прізвища)
                            </Text>
                        </View>

                        {renderError(errors.root)}
                        <View>
                            <Button
                                label="Створити акаунт"
                                onPress={handleSubmit(onSubmit)}
                                className="h-[52] w-full self-center bg-slive border-border rounded-[1234] justify-center"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}
