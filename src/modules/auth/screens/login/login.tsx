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
        <View>
            <View>
                <View>
                    <Text className="text-white dark:text-border font-normal text-4xl self-center">
                        Login
                    </Text>
                </View>
                <View className="self-center">
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
                                    placeholder="SuperCoolEmail@gmail.com"
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
                                    className="h-[60] bg-bgLight"
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
                                    className="h-[60] bg-bgLight"
                                />
                            );
                        }}
                    />
                    <View>
                        <Button
                            label="Login"
                            onPress={handleSubmit(onSubmit)}
                            className="h-[60] bg-bgLight border-border "
                        />
                    </View>
                </View>
            </View>
            <View>
                <Text>Already have an account?</Text>
                <Link href={"/register/"}>Register now</Link>
            </View>
        </View>
    );
}
