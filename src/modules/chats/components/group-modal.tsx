import { CreateGroupStep2Data } from "../types";
import Modal from "react-native-modal";
import { pickImage } from "../../../shared/utils/images";
import { useEffect, useState } from "react";
import { IUser } from "../../users/types";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { Input } from "../../../shared/ui/input";
import { TextBtn } from "../../../shared/ui/button";
import { DEFAULT_AVATAR_URL } from "../../../shared/constants";
import { ICONS } from "../../../shared/ui/icons";
import { UserAvatar } from "../../users/components/avatar";
import { renderError } from "../../../shared/utils/errors";
import { getUserDisplayName } from "../../users/utils";
import { RoundedButton } from "../../../shared/ui/button/button";
import { IModalBaseProps } from "../../main/types";
import clsx from "clsx";
import { ModalName, useModal } from "../../../shared/context/modal";
import { DEFAULT_ICONS } from "../../../shared/ui/icons/icons";

export function GroupCreateOrUpdateModal({
    defaultValues,
    onSubmit,
    name,
    isVisible,
    onCancel,
    chatId,
    close,
}: {
    defaultValues?: CreateGroupStep2Data;
    onSubmit: (data: CreateGroupStep2Data) => Promise<string | void>;
    onCancel?: () => void;
    name: ModalName.UPDATE_CHAT | ModalName.CREATE_CHAT_STEP_2;
    chatId?: number;
} & IModalBaseProps) {
    if (name === ModalName.UPDATE_CHAT && isVisible && !chatId)
        throw new Error(
            "Invalid GroupCreateOrUpdateModal invocation! chatId must be provided for update modal"
        );
    const { open } = useModal();
    const onFormSubmit = async (data: CreateGroupStep2Data) => {
        const errMsg = await onSubmit(data);
        if (errMsg) {
            return setError(errMsg);
        }
    };
    const [selectedMembers, setSelectedMembers] = useState<IUser[]>([]);
    const [chatName, setChatName] = useState<string>("");
    const [chatAvatar, setChatAvatar] = useState<string | undefined>();
    useEffect(() => {
        if (!defaultValues) return;
        setSelectedMembers(defaultValues.selectedMembers);
        setChatName(defaultValues.name);
        setChatAvatar(defaultValues.avatar);
    }, [defaultValues]);
    const [error, setError] = useState("");
    const pickChatPhoto = async () => {
        const result = await pickImage({
            mediaTypes: "images",
            allowsMultipleSelection: false,
        });
        if (result && !result.canceled && result.assets) {
            setChatAvatar(result.assets[0].uri);
        }
    };
    const heading = {
        [ModalName.UPDATE_CHAT]: "Редагування групи",
        [ModalName.CREATE_CHAT_STEP_2]: "Нова група",
    }[name];
    const confirmBtnLabel = {
        [ModalName.UPDATE_CHAT]: "Зберегти зміни",
        [ModalName.CREATE_CHAT_STEP_2]: "Створити групу",
    }[name];
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={close}
            coverScreen={false}
            className="bg-white justify-center items-center rounded-2xl my-auto"
            style={{ maxHeight: "70%" }}
        >
            <View className="px-10 pt-6 flex-1">
                <View className="gap-4">
                    <View className="w-full flex-row justify-end">
                        <ICONS.CloseIcon
                            onPress={close}
                            width={15}
                            height={15}
                            fill="#543C52"
                        />
                    </View>
                    <View className="justify-center items-center w-full">
                        <Text className="text-3xl font-bold">{heading}</Text>
                    </View>
                    <Input
                        placeholder="Введіть назву"
                        autoCapitalize="none"
                        label="Назва"
                        onChangeText={(text) => setChatName(text)}
                        value={chatName}
                        autoCorrect={false}
                        className="h-[42]"
                    />
                    <View className="gap-6 items-center justify-center">
                        {chatAvatar ? (
                            <Image
                                source={{ uri: chatAvatar }}
                                className="rounded-full w-12 h-12"
                            />
                        ) : (
                            <DEFAULT_ICONS.DEFAULT_GROUP_ICON
                                className="w-12 h-12"
                                width={48}
                                height={48}
                            />
                        )}
                        <View className="gap-6 flex-row">
                            <TextBtn
                                label="Додайте фото"
                                Icon={ICONS.PostsIcon}
                                onPress={pickChatPhoto}
                            />
                            <TextBtn
                                label="Оберіть фото"
                                Icon={ICONS.PostsIcon}
                                onPress={pickChatPhoto}
                            />
                        </View>
                    </View>
                    {error && renderError(error)}
                    <View
                        className={clsx(
                            "gap-4",
                            name === ModalName.UPDATE_CHAT &&
                                "border border-border p-4 rounded-lg"
                        )}
                    >
                        {name === ModalName.UPDATE_CHAT ? (
                            <View className="flex-row justify-between">
                                <Text className="text-lg">Учасники</Text>
                                <TextBtn
                                    onPress={() => {
                                        close();
                                        open({
                                            name: ModalName.ADD_GROUP_MEMBER,
                                            props: { chatId },
                                        });
                                    }}
                                    label="Додайте учасника"
                                    Icon={ICONS.PlusIcon}
                                />
                            </View>
                        ) : (
                            <Text className="text-lg">Учасники</Text>
                        )}
                        <ScrollView className="max-h-52">
                            {selectedMembers.map((contact) => (
                                <View
                                    key={contact.id}
                                    className="flex-row items-center gap-2 p-2"
                                >
                                    <UserAvatar
                                        user={contact}
                                        className="w-12 h-12"
                                        width={48}
                                        height={48}
                                    />
                                    <View className="flex-1">
                                        <Text className="font-medium text-lg">
                                            {getUserDisplayName(contact)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSelectedMembers((prev) =>
                                                prev.filter(
                                                    (selectedContact) =>
                                                        selectedContact.id !==
                                                        contact.id
                                                )
                                            )
                                        }
                                    >
                                        <ICONS.BinIcon width={20} height={20} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="flex-row justify-end gap-2">
                    <TouchableOpacity
                        className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
                        onPress={onCancel}
                        // label="Назад"
                    >
                        <Text className="text-slive text-center px-3">
                            Назад
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                        onPress={() =>
                            onFormSubmit({
                                name: chatName,
                                avatar: chatAvatar,
                                selectedMembers,
                            })
                        }
                        // label={confirmBtnLabel}
                        // filled
                        // darkFill
                    >
                        <Text className="text-white text-center px-3">
                            {confirmBtnLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
