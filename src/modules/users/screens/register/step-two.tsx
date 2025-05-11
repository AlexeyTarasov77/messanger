import { View, Text, ScrollView } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";
import { IRegisterStepOne, IRegisterStepTwo } from "../../types";
import { authService } from "../../services";

export function RegisterStepTwo() {
    const router = useRouter();
    const prevData = useLocalSearchParams() as unknown as IRegisterStepOne;

    const { handleSubmit, control, formState } = useForm<IRegisterStepTwo>({
        defaultValues: { otp: "" },
    });

    async function onSubmit(data: IRegisterStepTwo) {
        await authService.register({ ...data, ...prevData });
        router.replace("/");
    }
    return (
        <View className="h-full pt-10 bg-mainBg">
            <View className="self-center items-center rounded-2xl bg-white px-4 py-12">
                <View>
                    <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
                        Підтвердження пошти
                    </Text>
                </View>
                <View className="">
                    <Text className="text-darkBlue font-medium text-sm self-center pt-8 pb-4 px-4 text-center">
                        Ми надіслали 6-значний код на вашу пошту
                        (you@example.com). Введіть його нижче, щоб підтвердити
                        акаунт
                    </Text>
                </View>
                <View className="self-center w-full ">
                    <View className="gap-2">
                        <View>
                            <Text className="color-darkBlue text-base font-normal">
                                Код підтвердження
                            </Text>
                        </View>
                        <View className="flex-row gap-6">
                            <View className="flex-row gap-2">
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                    
                                </View>
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="flex-row gap-2">
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                </View>
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="flex-row gap-2">
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                </View>
                                <View className="flex-row">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    "Confirmation otp is required",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="___"
                                                onChange={field.onChange}
                                                onChangeText={field.onChange}
                                                value={field.value}
                                                autoCorrect={false}
                                                className="h-[40]"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                        <View><Text>{formState.errors.otp?.message}</Text></View>
                    </View>
                    <View>
                        <View>
                            <Button
                                label="Підтвердити"
                                onPress={handleSubmit(onSubmit)}
                                className="h-[52] w-full self-center bg-slive border-border rounded-[1234] justify-center"
                            />
                        </View>
                        <View className="self-center">
                            <Link href="/users/register-step-one" asChild>
                                <Text className="font-bold text-2xl color-slive">
                                    Назад
                                </Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
