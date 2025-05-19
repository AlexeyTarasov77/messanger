import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from "react-hook-form";
import { Link, useRouter } from "expo-router";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input/input";
import { IPost, IPostTag, ICreatePostForm } from "../types";

export function CreatePost() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);

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

  const toggleModal = () => setModalVisible(!isModalVisible);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      alert("Permission required to access media");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true, 
      base64: false,
    });

    if (!result.canceled && result.assets) {
      setImages(prev => [...prev, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const onSubmit = async (data: ICreatePostForm) => {
    try {

      toggleModal();
    } catch (error) {
    }
  };

  return (
    <ScrollView className="bg-mainBg">
      <View className="gap-4 p-4">

        <TouchableOpacity onPress={toggleModal} className="bg-plum p-3 rounded-xl">
          <Text className="text-white text-center">Створити пост</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View className="bg-white rounded-2xl p-4 gap-2">
            <View className="w-full flex-row  justify-end">
              <ICONS.CloseIcon onPress={toggleModal} width={15} height={15} fill="#543C52" />
            </View>
            <Text className="text-xl font-bold">
              Створення публікації
            </Text>
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
                    placeholder="Напишіть назву публікації"
                    onChange={field.onChange}
                    onChangeText={field.onChange}
                    value={field.value}
                    label="Назва публікації"
                    autoCorrect={false}
                    errMsg={fieldState.error?.message}
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
                    placeholder="Напишіть тему публікації"
                    onChange={field.onChange}
                    onChangeText={field.onChange}
                    value={field.value}
                    label="Тема публікації"
                    autoCorrect={false}
                    errMsg={fieldState.error?.message}
                  />
                );
              }}
            />

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
                    errMsg={fieldState.error?.message}
                    className=" h-28 align-top"
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
                    placeholder="Напишіть посилання"
                    onChange={field.onChange}
                    onChangeText={field.onChange}
                    value={field.value}
                    label="Посилання"
                    autoCorrect={false}
                    errMsg={fieldState.error?.message}
                  />
                );
              }}
            />

            <View
              style={{ minHeight: 1, maxHeight: 288 }}
              className="mt-2 rounded-3xl justify-center"
            // className="h-72 mt-2 rounded-3xl justify-center"
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    className="h-72 w-72 mr-2 rounded-3xl"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>

            <View className="flex-row justify-end gap-2">
              <TouchableOpacity onPress={pickImage} className="border border-plum p-2 rounded-3xl">
                <ICONS.ImageIcon />
              </TouchableOpacity>
              <TouchableOpacity className="border border-plum  p-2 rounded-3xl">
                <ICONS.SmileyIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)} 
                className="flex-row items-center gap-1 bg-plum p-2 rounded-2xl">
                <Text className="text-white text-center pl-3 pr-3">Публікація</Text>
                <ICONS.SendPostIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ScrollView>
  );
}
