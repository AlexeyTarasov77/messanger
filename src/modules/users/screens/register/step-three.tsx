import { View, Text, ScrollView } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";
import { IRegisterStepOne, IRegisterStepThree, IRegisterStepTwo } from "../../types";
import { authService } from "../../services";

export function RegisterStepThree() {
    const prevData = useLocalSearchParams() as unknown as IRegisterStepTwo & IRegisterStepOne;

    const { handleSubmit, control } = useForm<IRegisterStepThree>({
        defaultValues: { otp: "" },
    });

    async function onSubmit(data: IRegisterStepThree) {
        await authService.register({ ...data, ...prevData })
    }
    return (
        <ScrollView
        // contentContainerStyle={{ flexGrow: 1 }}
        // className="flex-1"
        >
            {/* <View></View> */}
            <View className="flex-1 justify-center items-center gap-5">
                <View>
                    <Text className="text-white dark:text-bgLight font-normal text-4xl self-center">
                        Registration
                    </Text>
                </View>
                <View className="self-center gap-10 w-[80%]">
                    <Controller
                        control={control}
                        name="otp"
                        rules={{ required: { value: true, message: "Confirmation email is required" } }}
                        render={({ field, fieldState }) => (
                            <Input
                                placeholder="entering the code"
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Confirmation email"
                                autoCorrect={false}
                                errMsg={fieldState.error?.message}
                                className="h-[60]"
                            />
                        )}
                    />
                    <View>
                        <Button.Registr
                            label="registration"
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
