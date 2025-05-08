import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { Input } from "../../../../shared/ui/input";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useLocalSearchParams } from "expo-router";

const BASE_URL = "http://192.168.0.115:8000";

export function RegisterStepThree() {
    const {
        email,
        username,
        password,
        phoneNumber,
        firstName,
        lastName,
        image,
    } = useLocalSearchParams();

    const { handleSubmit, control } = useForm<{ emailCode: string }>({
        defaultValues: { emailCode: "" },
    });

    async function onSubmit(data: { emailCode: string }) {
        const formData = new FormData()

        formData.append("email", email as string)
        formData.append("username", username as string)
        formData.append("password", password as string)
        formData.append("phoneNumber", phoneNumber as string)
        formData.append("firstName", firstName as string)
        formData.append("lastName", lastName as string)
        formData.append("emailCode", data.emailCode)

        if (image) {
            formData.append("image", {
                uri: image as string,
                name: "avatar.jpg",
                type: "image/jpeg"
            } as any)
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            })
            const resJson = await response.json()
            console.log("Server response:", resJson)
        } catch (error) {
            console.error("Error during registration:", error)
        }
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
                        name="emailCode"
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
                    href={"/auth/login"}
                    className="text-bgLight text-base font-bold"
                >
                    Login
                </Link>
            </View>
        </ScrollView>
    );
}
