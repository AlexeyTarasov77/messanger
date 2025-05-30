import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../shared/ui/input/input";
import { ICreatePostForm, PostMedia, PostMediaType } from "../types";
import { useCreatePostModal } from "../components";
import { renderError } from "../../../shared/utils/errors";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { BinIcon } from "../../../shared/ui/icons/bin-icon";
import { Tag } from "../components/tag";

export function CreatePostModal() {
    const { visible, close } = useCreatePostModal();
    const { addPost } = useUserCtx();
    // images contains array of base64 encoded selected images
    const [images, setImages] = useState<PostMedia[]>([]);
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<ICreatePostForm>({
        defaultValues: {
            title: "",
            subject: "",
            body: "",
            link: "",
            tags: [],
        },
    });

    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
            alert("Permission required to access media");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsMultipleSelection: true,
            base64: true,
        });

        if (!result.canceled && result.assets) {
            // Добавляем новые URI к уже выбранным фото
            setImages((prev) => [
                ...prev,
                ...result.assets.map((asset) => ({
                    url: String(asset.uri),
                    type: asset.type as PostMediaType,
                })),
            ]);
        }
    };

    const onSubmit = async (data: ICreatePostForm) => {
        data.media = images;
        const errMsg = await addPost(data);
        if (errMsg) {
            return setError("root", { message: errMsg });
        }
        close();
    };

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={close}
            coverScreen={false}
            className="bg-white justify-center items-center rounded-2xl my-auto"
            style={{ maxHeight: "60%" }}
        >
            <ScrollView className="p-4 gap-2 flex-1">
                <View className="w-full flex-row justify-end">
                    <ICONS.CloseIcon
                        onPress={close}
                        width={15}
                        height={15}
                        fill="#543C52"
                    />
                </View>
                <Text className="text-xl font-bold">Створення публікації</Text>
                <View className="gap-4">
                    <Controller
                        control={control}
                        name="title"
                        rules={{
                            required: {
                                value: true,
                                message: "Назва публікації обов’язкова",
                            },
                            maxLength: {
                                value: 50,
                                message: "Максимум 50 символів",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    className="w-full"
                                    placeholder="Напишіть назву публікації"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Назва публікації"
                                    autoCorrect={false}
                                    err={fieldState.error}
                                />
                            );
                        }}
                    />

                    <Controller
                        control={control}
                        name="subject"
                        rules={{
                            required: {
                                value: true,
                                message: "Тема публікації обов’язкова",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    className="w-full"
                                    placeholder="Напишіть тему публікації"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Тема публікації"
                                    autoCorrect={false}
                                    err={fieldState.error}
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                            <Tag
                                selectedTags={field.value}
                                onToggle={(tag) => {
                                    const isSelected = field.value.some(
                                        (t) => t.id === tag.id
                                    );
                                    if (isSelected) {
                                        field.onChange(
                                            field.value.filter(
                                                (t) => t.id !== tag.id
                                            )
                                        );
                                    } else {
                                        field.onChange([...field.value, tag]);
                                    }
                                }}
                            />
                        )}
                    />
                    <TouchableOpacity className="rounded-full border-slive border-text border p-2 w-8 justify-center items-center">
                        <ICONS.PlusIcon width={14} height={14} />
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="body"
                        rules={{
                            required: {
                                value: true,
                                message: "Тема публікації обов’язкова",
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    placeholder="Введіть текст..."
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    autoCorrect={false}
                                    err={fieldState.error}
                                    className=" h-28 align-top w-full"
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="link"
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    className="w-full"
                                    placeholder="Напишіть посилання"
                                    onChange={field.onChange}
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    label="Посилання"
                                    autoCorrect={false}
                                    err={fieldState.error}
                                />
                            );
                        }}
                    />

                    <View
                        style={{ minHeight: 1, maxHeight: 288 }}
                        className="mt-2 mb-3 rounded-3xl justify-center"
                    >
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {images.map((imageData, index) => (
                                <View key={index} className="mr-2 relative">
                                    <Image
                                        source={{ uri: imageData.url }}
                                        className="h-72 w-72 rounded-3xl"
                                        resizeMode="cover"
                                    />
                                    <View className="absolute w-10 h-10 bg-white top-3 right-3 border rounded-full justify-center items-center">
                                        <TouchableOpacity
                                            onPress={() =>
                                                setImages(
                                                    images.filter(
                                                        (img) =>
                                                            img.url !=
                                                            imageData.url
                                                    )
                                                )
                                            }
                                        >
                                            <BinIcon width={20} height={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                {renderError(errors.root)}
                <View className="flex-row justify-end gap-2">
                    <TouchableOpacity
                        onPress={pickImage}
                        className="border border-plum p-2 rounded-3xl"
                    >
                        <ICONS.ImageIcon />
                    </TouchableOpacity>
                    <TouchableOpacity className="border border-plum  p-2 rounded-3xl">
                        <ICONS.SmileyIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="flex-row items-center gap-1 bg-plum p-2 rounded-2xl"
                    >
                        <Text className="text-white text-center pl-3 pr-3">
                            Публікація
                        </Text>
                        <ICONS.SendPostIcon width={20} height={20} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    );
}
