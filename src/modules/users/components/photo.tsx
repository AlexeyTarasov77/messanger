import { View, Image } from "react-native";
import { RoundedButton } from "../../../shared/ui/button/button";
import { ICONS } from "../../../shared/ui/icons";
import clsx from "clsx";

export function UserPhoto({ imageURI, onBinClick, onEyeClick, iconsSize, imgSize, className, btnsClassname }: {
  imageURI: string, onEyeClick?: () => void, onBinClick?: () => void, iconsSize?: number, imgSize?: number, className?: string, btnsClassname?: string
}) {
  imgSize = imgSize || 200
  iconsSize = iconsSize || 20
  return (
    <View className={clsx("relative", className)}>
      <Image source={{ uri: imageURI }} className="rounded-xl" width={imgSize} height={imgSize} />
      <View className={clsx("absolute gap-2 flex-row", btnsClassname)}>
        <RoundedButton onPress={onEyeClick} filled icon={<ICONS.EyeIcon width={iconsSize} height={iconsSize} />} />
        <RoundedButton onPress={onBinClick} filled icon={<ICONS.BinIcon width={iconsSize} height={iconsSize} />} />
      </View>
    </View>
  )
}
