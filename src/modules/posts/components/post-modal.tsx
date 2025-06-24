import { ScrollView, Text, View } from "react-native";
import { IModalBaseProps } from "../../main/types";
import Modal from "react-native-modal";
import { ICONS } from "../../../shared/ui/icons";

export function PostModal({ isVisible, close, children, heading }: IModalBaseProps & React.PropsWithChildren & { heading: string }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={close}
      coverScreen={false}
      className="bg-white justify-center items-center rounded-2xl my-auto"
      style={{ maxHeight: "70%" }}
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
    </Modal>
  )
}
