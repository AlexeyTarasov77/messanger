import { View, Text, ScrollView } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { IRegister } from "../../types";

const BASE_URL = "http://192.168.0.115:8000";

export function Register() {
    const { handleSubmit, control } = useForm<IRegister>({
        defaultValues: { email: "", username: "", password: "" },
    });
    async function onSubmit(data: IRegister) {
        console.log("Successful registration:", data);
    }
    return (
        <ScrollView style={{
        }} >
            <View className="flex-1 justify-center gap-5">
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
                                iconLeft={<ICONS.UserIcon width={30} height={30}/>}
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
                                iconLeft={<ICONS.UserIcon width={30} height={30}/>}
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Last name"
                                autoCorrect={false}
                                errMsg={fieldState.error?.message}
                                className="h-[60]"
                            />
                        )}
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
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: {
                                value: true,
                                message: "Password is required",
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
                            label="Register"
                            onPress={handleSubmit(onSubmit)}
                            className="h-[50] w-[160] font-normal self-center bg-bgLight dark:bg-bgDark border-border rounded-xl justify-center"
                        />
                    </View>
                </View>
            </View>
            <View className=" flex-row self-center ">
                <Text className="text-white">Do you have an account? </Text>
                <Link
                    href={"/auth/login/"}
                    className="text-bgLight text-base font-bold"
                >
                    Login
                </Link>
            </View>
        </ScrollView>
    );
}
