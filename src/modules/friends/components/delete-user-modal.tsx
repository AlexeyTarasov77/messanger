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
            style={{ maxHeight: "70%" }}
        >
            <ScrollView className="p-4 gap-2 flex-1">
                <View className="w-full flex flex-col justify-center items-center gap-4">
                    <Text className="text-xl font-bold">Підтвердити дію</Text>
                    <Text className="text-xl font-bold">
                        Ви дійсно хочете видалити користувача?
                    </Text>
                </View>
                <View className="w-full flex-row justify-end gap-2">
                    <TouchableOpacity onPress={close} className="flex-row items-center gap-1 bg-gray-300 p-2 rounded-2xl">
                        <Text className="text-black text-center px-3">Скасувати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            callback?.(); 
                            close();
                        }}
                        className="flex-row items-center gap-1 bg-red-500 p-2 rounded-2xl"
                    >
                        <Text className="text-white text-center px-3">Підтвердити</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    );
}
