import { View, Text } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "../../types";

export function Login() {
    const { handleSubmit, control } = useForm<ILogin>({
        defaultValues: { email: "", password: "" },
    });
    function onSubmit(data: ILogin) {
        console.log(data);
    }
    return (
        <View className="h-full">
            <View className="flex-auto justify-center">
                <View>
                    <Text className="text-white dark:text-bgLightOne font-normal text-4xl self-center">
                        Login
                    </Text>
                </View>
                <View className="self-center gap-10 w-[250]">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    placeholder="Email@gmail.com"
                                    iconLeft={
                                        <ICONS.EmailIcon
                                            width={30}
                                            height={30}
                                        />
                                    }
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Email"
                                    autoCorrect={false}
                                    errMsg={fieldState.error?.message}
                                    className="h-[60] flex-row"
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
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input.Password
                                    placeholder="Password"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Password"
                                    autoCorrect={false}
                                    errMsg={fieldState.error?.message}
                                    className="h-[60]"
                                />
                            );
                        }}
                    />
                    <View>
                        <Button
                            label="Login"
                            onPress={handleSubmit(onSubmit)}
                            className="h-[50] w-[160] self-center bg-bgLight dark:bg-bgDark border-border rounded-xl justify-center"
                        />
                    </View>
                </View>
            </View>
            <View className=" flex-row self-center">
                <Text className="text-white">Don`t have an account?</Text>
                <Link href={"/auth/registration/"} className="text-bgDark dark:text-bgLight font-bold text-base">Register now</Link>
            </View>
        </View>
    );
}
