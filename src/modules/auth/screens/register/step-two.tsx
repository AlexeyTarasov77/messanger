import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Link } from "expo-router";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepTwo } from "../../types";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

const defaultImage = require("../../../../../assets/user-image.png");
const BASE_URL = "http://192.168.0.115:8000";

export function RegisterStepTwo() {
    const router = useRouter();
    const [image, setImage] = useState<string>("")
    const { email, username, password } = useLocalSearchParams()

    console.log({ email, username, password })
    const { handleSubmit, control } = useForm<IRegisterStepTwo>({
        defaultValues: { phoneNumber: "", firstName: "", lastName: "", avatarUrl: "", },
    });
    async function onSubmit(data: IRegisterStepTwo) {
        router.push({
            pathname: "/auth/register-step-three",
            params: {
                email,
                username,
                password,
                phoneNumber: data.phoneNumber,
                firstName: data.firstName,
                lastName: data.lastName,
                image,
            }
        });
    }
    async function onSearch() {
        const result = await requestMediaLibraryPermissionsAsync()
        if (result.status === "granted") {
            const images = await launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                allowsMultipleSelection: false,
                selectionLimit: 1,
                base64: false,
            });
            if (images.assets) {
                setImage(images.assets[0].uri)
            }
        } else {
        }
    }
    return (
        <ScrollView>
            <View className="flex-1 justify-center items-center gap-5">
                <View>
                    <Text className="text-white dark:text-bgLight font-normal text-4xl self-center">
                        Registration
                    </Text>
                </View>

                <View className="items-center justify-center">
                    <Button.UserAvatar />
                    <Text className="self-center text-white font-bold" >Add photo</Text>
                </View>

                <View className="self-center gap-10 w-[80%]">
                    <Controller
                        control={control}
                        name="phoneNumber"
                        rules={{ required: { value: true, message: "Phone number is required" } }}
                        render={({ field, fieldState }) => (
                            <Input
                                placeholder="Phone number"
                                iconLeft={<ICONS.PhoneNumberIcon width={30} height={30} />}
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Phone number"
                                autoCorrect={false}
                                errMsg={fieldState.error?.message}
                                className="h-[60]"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: { value: true, message: "First name is required" } }}
                        render={({ field, fieldState }) => (
                            <Input
                                placeholder="First name"
                                iconLeft={<ICONS.UserIcon width={30} height={30} />}
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="First name"
                                autoCorrect={false}
                                errMsg={fieldState.error?.message}
                                className="h-[60]"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: { value: true, message: "Last name is required" } }}
                        render={({ field, fieldState }) => (
                            <Input
                                placeholder="Last name"
                                iconLeft={<ICONS.UserIcon width={30} height={30} />}
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Last Name"
                                autoCorrect={false}
                                errMsg={fieldState.error?.message}
                                className="h-[60]"
                            />
                        )}
                    />
                    <View>
                        <Button.Registr
                            label="next step"
                            onPress={handleSubmit(onSubmit)}
                            className="h-[50] w-[160] font-normal self-center bg-bgLight dark:bg-bgDark border-border rounded-xl justify-center"
                        />
                    </View>
                </View>
            </View>
            <View className=" flex-row self-center ">
                <Text className="text-white">Do you have an account? </Text>
                <Link
                    href={"/auth/login"}
                    className="text-bgLight text-base font-bold"
                >
                    Login
                </Link>
            </View>
            {/* <View className=" flex-row self-center ">
                <Text className="text-white">Do you have an account? </Text>
                <Link
                    href={"/auth/register-step-three"}
                    className="text-bgLight text-base font-bold"
                >
                    Regist
                </Link>
            </View> */}
        </ScrollView>
    );
}
