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
        <ScrollView className="bg-white rounded-lg mb-10">
            <View className="flex-row justify-between px-2">
                <Text className="font-medium">{title}</Text>
                {seeAllLink && (
                    <Link href={seeAllLink}>
                        <Text className="font-medium text-slive">Дивитись всі</Text>
                    </Link>
                )}
            </View>
            {children}
        </ScrollView>
    );
}
