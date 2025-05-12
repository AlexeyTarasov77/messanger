import { View, Text } from "react-native";
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

    const { handleSubmit, control, formState } =
        useForm<IRegisterStepTwo>({
            defaultValues: {
                otp1: "",
                otp2: "",
                otp3: "",
                otp4: "",
                otp5: "",
                otp6: "",
            },
        });

    const otpFieldNames = [
        "otp1",
        "otp2",
        "otp3",
        "otp4",
        "otp5",
        "otp6",
    ] as const;

    const otpInputs = otpFieldNames.map((fieldName, index) => (
        <View className="flex-row" key={index}>
            <Controller
                control={control}
                name={fieldName}
                rules={{
                    required: {
                        value: true,
                        message: "Confirmation otp is required",
                    },
                    maxLength: 1,
                }}
                render={({ field }) => (
                    <Input
                        placeholder="___"
                        onChange={field.onChange}
                        onChangeText={field.onChange}
                        value={field.value}
                        autoCorrect={false}
                        className="h-[40] w-8 text-center border-grey rounded-2xl"
                    />
                )}
            />
            {/* <View>
                <Text>{formState.errors[fieldName]?.message}</Text>
            </View> */}
        </View>
    ));

    const groupedOtp = [];
    for (let i = 0; i < otpInputs.length; i += 2) {
        groupedOtp.push(
            <View className="flex-row gap-2" key={i}>
                {otpInputs.slice(i, i + 2)}
            </View>
        );
    }

    async function onSubmit(data: IRegisterStepTwo) {
        const otp = otpFieldNames.map((name) => data[name]).join("");
        console.log("OTP:", otp);
        await authService.register({  ...prevData, otp });
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
                        (you@example.com). Введіть його нижче, щоб підтвердити
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
                        <View className="flex-row gap-6 pb-8 ">
                            {groupedOtp}
                        </View>
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
