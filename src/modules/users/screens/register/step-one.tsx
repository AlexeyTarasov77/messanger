import { View, Text } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepOne } from "../../types";
import { useRouter } from "expo-router";
import { authService } from "../../services";

export function RegisterStepOne() {
    const router = useRouter();
    const { handleSubmit, control } = useForm<IRegisterStepOne>({
        defaultValues: { email: "",  password: "", confirmPassword:""},
    });
    async function onSubmit(data: IRegisterStepOne) {
        router.push({
            pathname: "/users/register-step-two",
            params: {
                email: data.email,
                password: data.password
            },
        });
        console.log(data.email)
        await authService.sendOTP(data.email);
    }
    return (
        <View className="h-full pt-10 bg-mainBg">
            <View className="self-center items-center rounded-2xl bg-white px-4 py-12">
                <View className="flex-row gap-4 justify-center">
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
                </View>
                <View>
                    <Text className="text-darkBlue font-medium text-2xl self-center pt-8 pb-4">
                        Приєднуйся до World IT
                    </Text>
                </View>

                <View className="self-center gap-10 w-[80%]">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: "Email is required",
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    placeholder="you@example.com"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Електронна пошта"
                                    autoCorrect={false}
                                    errMsg={fieldState.error?.message}
                                    className="h-[42] w-full"
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input.Password
                                    placeholder="Введи пароль"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Пароль"
                                    autoCorrect={false}
                                    errMsg={fieldState.error?.message}
                                    className="h-[42]"
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
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
                                    errMsg={fieldState.error?.message}
                                    className="h-[42] flex-1"
                                />
                            );
                        }}
                    />
                    <View>
                        <Button
                            label="Створити акаунт"
                            onPress={handleSubmit(onSubmit)}
                            className="h-[52] w-full self-center bg-slive border-border rounded-[1234] justify-center"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
