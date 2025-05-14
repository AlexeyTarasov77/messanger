import { View, Text } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";
import { IRegisterStepOne, IRegisterStepTwo } from "../../types";
import { authService } from "../../services";
import { collectFullCode, otpFieldsDefaults, OTPInput } from "./otp-input";

export function RegisterStepTwo() {
    const router = useRouter();
    const prevData = useLocalSearchParams() as unknown as IRegisterStepOne;
    const { handleSubmit, control, formState } =
        useForm<IRegisterStepTwo>({
            defaultValues: otpFieldsDefaults,
        });
    async function onSubmit(data: IRegisterStepTwo) {
        const otp = collectFullCode(data)
        console.log("OTP:", otp);
        await authService.register({ ...prevData, otp });
        router.replace("/");
    }

    return (
        <View className="h-full pt-10 bg-mainBg">
            <View className="self-center items-center rounded-2xl bg-white px-4 py-12 w-[90%]">
                <View>
                    <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
                        Підтвердження пошти
                    </Text>
                </View>
                <View>
                    <Text className="text-darkBlue font-medium text-sm self-center pt-8 pb-4 px-4 text-center">
                        Ми надіслали 6-значний код на вашу пошту
                        ({prevData.email}). Введіть його нижче, щоб підтвердити
                        акаунт
                    </Text>
                </View>
                <View className="self-center ">
                    <View className="gap-2 pb-3 ">
                        <View>
                            <Text className="color-darkBlue text-base font-normal">
                                Код підтвердження
                            </Text>
                        </View>
                        <OTPInput control={control} errors={formState.errors} />
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
