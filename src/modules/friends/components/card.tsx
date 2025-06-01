// це карточка наприклад усі запити іт.д.

import { Link } from "expo-router";
import { ReactNode } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

interface ICardProps {
    title: string;
    seeAllLink?: string;
    children: ReactNode;
}

export function Card(props: ICardProps) {
    const { title, seeAllLink, children } = props;
    return (
        <View className="bg-white rounded-xl border-border border mb-6 pb-2">
            <View className="flex-row justify-between px-2 py-4">
                <Text className="font-medium text-base">{title}</Text>
                {seeAllLink && (
                    <Link href={seeAllLink}>
                        <Text className="font-medium text-base text-slive">
                            Дивитись всі
                        </Text>
                    </Link>
                )}
            </View>
            <ScrollView>{children}</ScrollView>
        </View>
    );
}
