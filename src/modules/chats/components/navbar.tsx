import { usePathname, useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { links } from "./links";
import clsx from "clsx";


export function NavBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View className="flex-row justify-around bg-white border-b border-gray-300 py-4">
            {links.map((link) => (
                <TouchableOpacity
                    key={link.path}
                    onPress={() => router.replace(link.path)}
                    className={clsx(
                        "pb-2",
                        pathname === link.path && "border-t-2 border-slive"
                    )}
                >
                    <View className="items-center py-2">
                        <link.icon />
                    </View>
                    <Text
                        className={clsx(
                            "font-medium",
                            pathname === link.path
                                ? "text-slive"
                                : "text-darkBlue"
                        )}
                    >
                        {link.label}
                    </Text>

                </TouchableOpacity>
            ))}
        </View>
    );
}
