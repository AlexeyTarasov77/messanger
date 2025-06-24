import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";
import { ICONS } from "../../../../../shared/ui/icons";
import { IModalBaseProps } from "../../../../main/types";

export function AlbumModal({
    isVisible,
    close,
    children,
    heading,
    onConfirm
}: IModalBaseProps & React.PropsWithChildren & { heading: string, onConfirm?: () => void }) {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={close}
            coverScreen={false}
            className="bg-white justify-center items-center rounded-2xl my-auto"
            style={{ maxHeight: "40%" }}
        >
            <ScrollView className="p-4 gap-2 flex-1">
                <View className="w-full flex-row justify-end">
                    <ICONS.CloseIcon
                        onPress={close}
                        width={15}
                        height={15}
                        fill="#543C52"
                    />
                </View>
                <Text className="text-xl font-bold">{heading}</Text>
                {children}
            </ScrollView>
            <View className="w-full flex-row justify-end gap-2 pb-8 pr-2">
                <TouchableOpacity
                    onPress={close}
                    className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
                >
                    <Text className="text-black text-center px-3">
                        Скасувати
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onConfirm?.();
                        close();
                    }}
                    className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
                >
                    <Text className="text-white text-center px-3">
                        Зберегти
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
