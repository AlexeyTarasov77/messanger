import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Link } from "expo-router";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from 'expo-image-picker'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepOne, IRegisterStepTwo } from "../../types";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { authService } from "../../services";

const defaultImage = require("../../../../../assets/user-image.png");

export function RegisterStepTwo() {
    const router = useRouter();
    const [image, setImage] = useState<string>("")
    const prevData = useLocalSearchParams() as unknown as IRegisterStepOne

    const { handleSubmit, control } = useForm<IRegisterStepTwo>({
        defaultValues: { phoneNumber: "", firstName: "", lastName: "", avatar: "", },
    });
    async function onSubmit(data: IRegisterStepTwo) {
        await authService.sendOTP(prevData.email)
        router.push({
            pathname: "/users/register-step-three",
            params: {
                ...prevData,
                ...data,
                avatar: image,
            } satisfies IRegisterStepTwo & IRegisterStepOne
        });
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
                    <Button.UserAvatarTypeOne />
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
                    href={"/users/login"}
                    className="text-bgLight text-base font-bold"
                >
                    Login
                </Link>
            </View>
        </ScrollView>
    );
}
