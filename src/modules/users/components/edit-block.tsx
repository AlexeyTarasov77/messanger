import { TouchableOpacity, View, TouchableOpacityProps, Text } from "react-native";
import { ICONS } from "../../../shared/ui/icons";

interface IEditBlockProps extends Omit<TouchableOpacityProps, "onPress"> {
  label: string;
  isEditMode: boolean;
  onSave: () => void;
  toggleMode: () => void;
}

export function EditBlock({ label, isEditMode, toggleMode, onSave, ...rest }: IEditBlockProps) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-darkBlue text-lg">{label}</Text>
      <View className="gap-2 flex-row">
        <TouchableOpacity
          className={`flex-row gap-2 rounded-full border border-slive p-3 items-center justify-center ${isEditMode ? "bg-purple-50" : ""}`}
          {...rest}
          onPress={() => isEditMode ? onSave() : toggleMode()}
        >
          <ICONS.EditIcon width={15} height={15} />
          {isEditMode && <Text>Зберегти</Text>}
        </TouchableOpacity>
        {isEditMode &&
          <TouchableOpacity className="rounded-full border border-slive p-3 items-center justify-center" {...rest} onPress={toggleMode}>
            <ICONS.CloseIcon width={15} height={15} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}
