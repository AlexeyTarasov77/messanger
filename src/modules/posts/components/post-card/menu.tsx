import {
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { SvgProps } from "react-native-svg";

export function MenuBtn({
  label,
  Icon,
  ...props
}: { label: string, Icon: (props: SvgProps) => React.JSX.Element } & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      className="w-full"
    >
      <View className="gap-2 flex-row items-center">
        <Icon width={20} height={20} />
        <Text className="text-lg">{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Menu({ onEdit, onRemove }: { onEdit: () => void, onRemove: () => void }) {
  return (
    <View className="absolute top-1/4 right-1/2 shadow-lg rounded-xl p-4 gap-4 bg-sliveLight z-10 w-80">
      <View className="ml-auto"><ICONS.PostSettingsIcon height={16} /></View>
      <MenuBtn Icon={ICONS.BinIcon} label="Видалити публікацію" onPress={onRemove} />
      <View className="border border-border" />
      <MenuBtn
        Icon={ICONS.PenIcon}
        label="Редагувати допис"
        onPress={onEdit}
      />
    </View>
  );
}
