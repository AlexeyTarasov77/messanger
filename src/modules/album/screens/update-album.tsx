import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../shared/ui/input/input";
import { IUpdateAlbumForm, AlbumMedia } from "../types";
import { renderError } from "../../../shared/utils/errors";
import { BinIcon } from "../../../shared/ui/icons/bin-icon";
import { useUpdateAlbumModal } from "../components";
import { useUserCtx } from "../../users/components/users-ctx/context";

export function UpdateAlbumModal() {
  const { visible, close } = useUpdateAlbumModal()
  const { updateAlbum } = useUserCtx()
  const [images, setImages] = useState<AlbumMedia[]>([]);
 
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors }
  } = useForm<IUpdateAlbumForm>({
    defaultValues: {
      id: 0,
      name: "",
      subject: "",
      year: "",
    },
  });

  const onSubmit = async (data: IUpdateAlbumForm) => {
    const errMsg = await updateAlbum(data)
    if (errMsg) {
      return setError("root", { message: errMsg })
    }
    close()
  };

  return (
    <Modal isVisible={visible} onBackdropPress={close} coverScreen={false} className="bg-white justify-center items-center rounded-2xl my-auto" style={{ maxHeight: "60%" }}>
      <ScrollView className="p-4 gap-4">
        <Text className="text-xl font-bold">Редагування альбому</Text>

        <Controller
          control={control}
          name="name"
          rules={{ required: "Назва обов’язкова" }}
          render={({ field, fieldState }) => (
            <Input.InputSelect
              placeholder="Назва альбому"
              label="Назва"
              value={field.value}
              onChangeText={field.onChange}
              err={fieldState.error}
            />
          )}
        />

        <Controller
          control={control}
          name="subject"
          rules={{ required: "Оберіть тему" }}
          render={({ field, fieldState }) => (
            <Input.InputSelect
              placeholder="Тема"
              label="Оберіть тему"
              value={String(field.value)}
              onChangeText={field.onChange}
              err={fieldState.error}
            />
          )}
        />

        <Controller
          control={control}
          name="year"
          rules={{ required: "Введіть рік" }}
          render={({ field, fieldState }) => (
            <Input.InputSelect
              placeholder="Рік"
              label="Рік альбому"
              value={field.value}
              onChangeText={field.onChange}
              err={fieldState.error}
            />
          )}
        />

        <View className="flex-row flex-wrap gap-2 py-2">
          {images.map((img, i) => (
            <View key={i} className="relative mr-2">
              <Image source={{ uri: img.url }} className="h-40 w-40 rounded-xl" />
              <TouchableOpacity
                onPress={() => setImages(images.filter(im => im.url !== img.url))}
                className="absolute top-2 right-2 bg-white p-1 rounded-full"
              >
                <BinIcon width={16} height={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {renderError(errors.root)}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-plum p-3 rounded-2xl"
        >
          <Text className="text-white text-center">Зберегти зміни</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}
