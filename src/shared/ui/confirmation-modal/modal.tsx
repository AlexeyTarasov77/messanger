import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { IModalBaseProps } from "../../../modules/main/types";


export function ConfirmationModal({ label, onConfirm, isVisible, close }: { label?: string, onConfirm?: () => void } & IModalBaseProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      coverScreen={false}
      className="bg-white justify-center items-center rounded-2xl my-auto"
      style={{ maxHeight: "30%" }}
    >
      <View className="p-4 justify-center items-center flex-1 gap-10">
        <View className="w-full flex flex-col justify-center items-center gap-4">
          <Text className="text-2xl font-bold">Підтвердити дію</Text>
          <Text className="text-lg w-full">
            {label || "Ви впевненi що хочете це зробити?"}
          </Text>
        </View>
        <View className="w-full flex-row justify-end gap-2">
          <TouchableOpacity onPress={close} className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]">
            <Text className="text-black text-center px-3">Скасувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onConfirm?.();
              close();
            }}
            className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
          >
            <Text className="text-white text-center px-3">Підтвердити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
