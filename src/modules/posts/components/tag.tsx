import { View, Text } from "react-native";
import { useTags } from "../hooks/use-tags";

export function Tag() {

    const { tags } = useTags();

    return (
        <View className="flex-row flex-wrap font-normal text-sm leading-none">
            {tags.map((tag) => (
                <Text className="text-text" key={tag.id}>
                    #{tag.name}
                </Text>
            ))}
        </View>
    );
}
