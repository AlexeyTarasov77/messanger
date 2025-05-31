import { View, Text, TouchableOpacity } from "react-native";
import { useTags } from "../hooks/use-tags";
import { IPost, IPostTag } from "../types";

interface TagProps {
    selectedTags: IPostTag[];
    onToggle: (tag: IPostTag) => void;
}

export function Tag({ selectedTags, onToggle }: TagProps) {
    const { tags } = useTags();

    return (
        <View className="flex-row flex-wrap font-normal text-sm leading-none">
            {tags.map((tag) => {
                const isSelected = selectedTags.some((t) => t.id === tag.id);
                return (
                    <TouchableOpacity
                        key={tag.id}
                        onPress={() => onToggle(tag)}
                        className={`px-3 py-1 rounded-full ${
                            isSelected ? "bg-slive" : "bg-sliveLight"
                        }`}
                    >
                        <Text
                            className={isSelected ? "text-sliveLight" : "text-slive"}
                        >
                            #{tag.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
