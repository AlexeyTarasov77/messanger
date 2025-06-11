import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useDeleteUserModal } from "./delete-modal-ctx";


export function DeleteUserModal() {
    const { visible, close, callback  } = useDeleteUserModal();

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={close}
            coverScreen={false}
            className="bg-white justify-center items-center rounded-2xl my-auto"
            style={{ maxHeight: "30%" }}
        >
            <View className="p-4 justify-center items-center flex-1 gap-10">
                <View className="w-full flex flex-col justify-center items-center gap-4">
                    <Text className="text-2xl font-bold">Підтвердити дію</Text>
                    <Text className="text-lg w-full">
                        Ви дійсно хочете видалити користувача?
                    </Text>
                </View>
                <View className="w-full flex-row justify-end gap-2">
                    <TouchableOpacity onPress={close} className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]">
                        <Text className="text-black text-center px-3">Скасувати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            callback?.(); 
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
