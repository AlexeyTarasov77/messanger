import { Controller, useForm, UseFormProps } from "react-hook-form";
import { ICreateAlbumForm } from "../../../types";
import { View, Text, TouchableOpacity } from "react-native";
import { Input } from "../../../../../shared/ui/input";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useTags } from "../../../../posts/hooks/use-tags";

export function AlbumForm({
    defaultValues,
    onSubmit,
    isPartialForm,
}: {
    defaultValues: UseFormProps<ICreateAlbumForm>["defaultValues"];
    onSubmit: (data: ICreateAlbumForm) => Promise<string | void>;
    isPartialForm?: boolean;
}) {
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<ICreateAlbumForm>({ defaultValues });

    const [selectedTopic, setSelectedTopic] = useState();
    const { tags } = useTags();

    return (
        <>
            <View>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: {
                            value: !isPartialForm,
                            message: "Назва альбому обов’язкова",
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
                                placeholder="Напишіть назву альбому"
                                onChange={field.onChange}
                                onChangeText={field.onChange}
                                value={field.value}
                                label="Назва альбому"
                                autoCorrect={false}
                                err={fieldState.error}
                            />
                        );
                    }}
                />
                <Controller
                    control={control}
                    name="topic"
                    rules={{
                        required: {
                            value: !isPartialForm,
                            message: "Назва альбому обов’язкова",
                        },
                        maxLength: {
                            value: 50,
                            message: "Максимум 50 символів",
                        },
                    }}
                    render={() => {
                        return (
                            <View>
                                <Text>Оберіть тему</Text>
                                    <Picker
                                        selectedValue={selectedTopic}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedTopic(itemValue)
                                        }
                                    >
                                        {tags.map((tag) => {
                                            return (
                                                <Picker.Item
                                                    label={tag.name}
                                                    value={tag.name}
                                                />
                                            );
                                        })}
                                    </Picker>
                            </View>
                        );
                    }}
                />
                <Controller
                    control={control}
                    name="created_at"
                    rules={{
                        required: {
                            value: !isPartialForm,
                            message: "Назва альбому обов’язкова",
                        },
                        maxLength: {
                            value: 50,
                            message: "Максимум 50 символів",
                        },
                    }}
                    render={() => {
                        return (
                            <View>
                                <Text>Рік альбому</Text>
                                <Picker
                                    className="flex-row rounded-xl px-4 border border-grey"
                                    selectedValue={selectedTopic}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedTopic(itemValue)
                                    }
                                >
                                    {tags.map((tag) => {
                                        return (
                                            <Picker.Item
                                                label={tag.name}
                                                value={tag.name}
                                            />
                                        );
                                    })}
                                </Picker>
                            </View>
                        );
                    }}
                />
            </View>
        </>
    );
}
