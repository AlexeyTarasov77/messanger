import { Link, useRouter } from "expo-router";
import { ScrollView, Text, View, Button } from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Input } from "../../../shared/ui/input";
import { UserAvatar } from "../../users/components/avatar";
import { Controller, useForm } from "react-hook-form";
import { ChatListCard } from "../components/chat-card";
import { IChatListSearch, IUser } from "../types";
import { useAllFriends } from "../../friends/hooks/use-all-friends";
import { Loader } from "../../../shared/ui/loader/loader";
import { IUserExtended } from "../../users/types";

export function ContactsScreen() {
    const router = useRouter();
    const {
        handleSubmit,
        control,
        getValues,
        setError,
        formState: { errors },
    } = useForm<IChatListSearch>({
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
        },
    });
    async function onSubmit(data: IChatListSearch) {
        router.push({
            pathname: "/users/settings",
            params: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
    }
    const { allFriends: contacts, isLoading } = useAllFriends()
    if (isLoading) {
        return <Loader />
    }
    return (
        <View className="bg-mainBg h-full">
            <ScrollView className="bg-white border border-gray-400 rounded-xl mt-3 mb-3">
                <View className="flex-row items-center m-5 gap-5">
                    <View className="w-full gap-5">
                        <View className="flex-row items-center gap-2">
                            <ICONS.ContactsIcon
                                width={20}
                                height={20}
                            />
                            <Text className="color-grey dark:text-bgLight font-medium text-xl ">
                                Контакти
                            </Text>
                        </View>
                        <Controller
                            control={control}
                            name="lastName"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Search is required",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <Input.InputSearch
                                        placeholder="Пошук"
                                        autoCapitalize="none"
                                        onChange={field.onChange}
                                        onChangeText={field.onChange}
                                        value={field.value}
                                        label=""
                                        autoCorrect={false}
                                        err={fieldState.error}
                                        className="h-[42] "
                                    />
                                );
                            }}
                        />
                        {contacts.map(contact => <ChatListCard key={contact.id} user={contact as IUserExtended} />)}

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
