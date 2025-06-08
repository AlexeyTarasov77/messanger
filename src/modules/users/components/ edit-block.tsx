import {
  View,
  TouchableOpacityProps,
} from "react-native";
import { ICONS } from "../../../shared/ui/icons";
import { Heading } from "../../../shared/ui/heading/heading";
import { RoundedButton } from "../../../shared/ui/button/button";

interface IEditBlockProps extends Omit<TouchableOpacityProps, "onPress"> {
  label: string;
  isEditMode: boolean;
  onSave: () => void;
  toggleMode: () => void;
}

export function EditBlock({
  label,
  isEditMode,
  toggleMode,
  onSave,
  ...rest
}: IEditBlockProps) {
  return (
    <Heading label={label} action={
      <View className="gap-2 flex-row">
        <RoundedButton
          filled={isEditMode}
          {...rest}
          onPress={() => (isEditMode ? onSave() : toggleMode())}
          label={isEditMode ? "Зберегти" : undefined}
          icon={<ICONS.EditIcon width={15} height={15} />}
        />
        {isEditMode && (
          <RoundedButton
            {...rest}
            onPress={toggleMode}
            icon={<ICONS.CloseIcon width={15} height={15} />}
          />
        )}
      </View>
    }
    />
  );
}
