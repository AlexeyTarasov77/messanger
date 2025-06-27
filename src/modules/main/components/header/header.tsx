import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { ICONS } from "../../../../shared/ui/icons";
import { LogoIcon, LogOutIcon, PlusIcon, SettingsIcon } from "../../../../shared/ui/icons/headerIcons";
import { useUserCtx } from "../../../users/components/users-ctx/context";
import { useCreatePostModal } from "../../../posts/components";
import { useCreateGroupModal } from "../../../chats/components";
import { useUpdateAlbumModal } from "../../../album/components";

export function Header({}) {
    const router = useRouter()
    const { user, logout } = useUserCtx()
    const { open: createPostModalOpen } = useCreatePostModal()
    const onLogout = () => {
        logout()
        router.navigate("/users/login")
    }
    return (
        <View className="flex-row p-2 gap-[30%] bg-white self-center justify-center w-full">
            <View className="self-center items-center justify-center">
                <Link href="/" asChild >
                    <TouchableOpacity>
                        <LogoIcon />
                    </TouchableOpacity>
                </Link>
            </View>
            {user &&
                <View className="flex-row gap-2 max-w-fit">
                    <TouchableOpacity onPress={() => createPostModalOpen()} className=" border-text border rounded-full p-2 ">
                        <PlusIcon width={20} height={20} />
                    </TouchableOpacity>,
                    <TouchableOpacity className=" border-text border rounded-full p-2 " onPress={() => router.navigate("/settings")}>
                        <SettingsIcon width={20} height={20} />
                    </TouchableOpacity>,
                    <TouchableOpacity
                        onPress={onLogout}
                        className="border-text border rounded-full p-2 "
                    >
                        <LogOutIcon width={20} height={20} />
                    </TouchableOpacity>,
                </View>
            }
        </View>
    );
}
function HeaderAlbum() {
    const router = useRouter();
    const { user, logout } = useUserCtx()
    const { open: updateAlbumModalOpen } = useUpdateAlbumModal()
    const onLogout = () => {
        logout()
        router.navigate("/users/login")
    }
    return (
        <View className="p-2 bg-white self-center justify-center w-full">
            <View className="flex-row p-2 gap-[30%] bg-white self-center justify-center w-full">
                <View className="self-center items-center justify-center">
                    <Link href="/" asChild >
                        <TouchableOpacity>
                            <LogoIcon />
                        </TouchableOpacity>
                    </Link>
                </View>
                {user &&
                    <View className="flex-row gap-2 max-w-fit">
                        <TouchableOpacity onPress={() => updateAlbumModalOpen()} className=" border-text border rounded-full p-2 ">
                            <PlusIcon width={20} height={20} />
                        </TouchableOpacity>,
                        <TouchableOpacity
                            onPress={onLogout}
                            className="border-text border rounded-full p-2 "
                        >
                            <LogOutIcon width={20} height={20} />
                        </TouchableOpacity>,
                    </View>
                }
            </View>
        </View>
    );
}

Header.HeaderAlbum = HeaderAlbum;



function HeaderChats() {
    const router = useRouter();
    const { user, logout } = useUserCtx()
    const { open: createGroupModalOpen } = useCreateGroupModal()
    const onLogout = () => {
        logout()
        router.navigate("/users/login")
    }
    const onMessages = () => {
        router.navigate("/users/messages")
    }
    const onChats = () => {
        router.navigate("/users/chats-list")
    }
    return (
        <View className="p-2 bg-white self-center justify-center w-full">
            <View className="flex-row p-2 gap-[30%] bg-white self-center justify-center w-full">
                <View className="self-center items-center justify-center">
                    <Link href="/" asChild >
                        <TouchableOpacity>
                            <LogoIcon />
                        </TouchableOpacity>
                    </Link>
                </View>
                {user &&
                    <View className="flex-row gap-2 max-w-fit">
                        <TouchableOpacity onPress={() => createGroupModalOpen()} className=" border-text border rounded-full p-2 ">
                            <PlusIcon width={20} height={20} />
                        </TouchableOpacity>,
                        <TouchableOpacity
                            onPress={onLogout}
                            className="border-text border rounded-full p-2 "
                        >
                            <LogOutIcon width={20} height={20} />
                        </TouchableOpacity>,
                    </View>
                }
            </View>
            <View className="flex-row p-2 gap-[10%] bg-white self-center justify-center w-full">
                <View className="w-auto items-center border-t-2">
                    <TouchableOpacity
                        onPress={onChats}
                        className="items-center p-2"
                    >
                        <ICONS.FriendsIcon width={20} height={20} />
                    </TouchableOpacity>,
                    <Text className="font-medium">
                        Контакти
                    </Text>
                </View>
                <View className="w-auto items-center">
                    <TouchableOpacity
                        onPress={onMessages}
                        className="items-center p-2"
                    >
                        <ICONS.ChatsIcon width={20} height={20} className="color-black"/>
                    </TouchableOpacity>,
                    <Text className="font-medium">
                        Повідомлення
                    </Text>
                </View>
                <View className="w-auto items-center">
                    <TouchableOpacity
                        onPress={onChats}
                        className="items-center p-2"
                    >
                        <ICONS.ChatsIcon width={20} height={20} className="color-black"/>
                    </TouchableOpacity>,
                    <Text className="font-medium">
                        Групові чати
                    </Text>
                </View>
            </View>
        </View>
    );
}

Header.HeaderChats = HeaderChats;

