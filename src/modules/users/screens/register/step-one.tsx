import { View, Text, ScrollView } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IRegisterStepOne } from "../../types";
import { useRouter } from "expo-router";

export function RegisterStepOne() {
    const router = useRouter();
    const { handleSubmit, control } = useForm<IRegisterStepOne>({
        defaultValues: { email: "", username: "", password: "" },
    });
    async function onSubmit(data: IRegisterStepOne) {
        router.push({
            pathname: "/users/register-step-two",
            params: {
                email: data.email,
                username: data.username,
                password: data.password,
            },
        });
    }
    return (
        <ScrollView style={{
        }} >
            <View className="flex-1 justify-center items-center gap-5">
                <View>
                    <Text className="text-white dark:text-bgLight font-normal text-4xl self-center">
                        Registration
                    </Text>
                </View>

                <View className="self-center gap-10 w-[80%]">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
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
                                    placeholder="Username"
                                    iconLeft={
                                        <ICONS.UserIcon
                                            width={30}
                                            height={30}
                                        />
                                    }
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Username"
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
                                message: "Password is required"
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
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
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input.Password
                                    placeholder="Confirm password"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Confirm password"
                                    autoCorrect={false}
                                    errMsg={fieldState.error?.message}
                                    className="h-[60]"
                                />
                            );
                        }}
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
