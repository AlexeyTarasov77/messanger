import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Alert,
} from "react-native";
import { useUserCtx } from "../../../users/components/users-ctx/context";

export function MenuBtn({
  label,
  ...props
}: { label: string } & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      className="w-full transition-colors hover:bg-plum"
    >
      <Text className="self-center text-lg">{label}</Text>
    </TouchableOpacity>
  );
}

export function Menu({ postId }: { postId: number }) {
  const { removePost } = useUserCtx();
  return (
    <View className="absolute top-1/4 right-1/2 shadow-lg rounded-xl w-24 p-3 bg-slate-200 z-10">
      <MenuBtn label="Delete" onPress={async () => await removePost(postId)} />
      <View className="border" />
      <MenuBtn
        label="Edit"
        onPress={() =>
          Alert.alert(
            "Not implemented",
            "This functionallity not implemented yet",
          )
        }
      />
    </View>
  );
}
