import { usePathname, useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { links } from "./links";
import clsx from "clsx";

export function Links() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="flex-row justify-around bg-mainBg border-b border-gray-300 py-4">
      {links.map((link) => (
        <TouchableOpacity
          key={link.path}
          onPress={() => router.replace(link.path)}
          className={clsx(
            "pb-2",
            pathname === link.path && "border-b-2 border-slive",
          )}
        >
          <Text
            className={clsx(
              "font-medium",
              pathname === link.path ? "text-slive" : "text-darkBlue",
            )}
          >
            {link.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
