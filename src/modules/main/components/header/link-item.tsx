import { ReactNode } from "react";
import { RoundedButton } from "../../../../shared/ui/button/button";
import { IRoundedButtonProps } from "../../../../shared/ui/button/button.types";
import { usePathname, useRouter } from "expo-router";

export function LinkItem({ focused, path, children, onPress, ...rest }: { focused?: boolean, path?: string, children: ReactNode } & IRoundedButtonProps) {
  const router = useRouter()
  const currentPath = usePathname()
  if (!onPress && path) {
    onPress = () => router.navigate(path)
    focused = (path === currentPath)
  }
  return (
    <RoundedButton filled={focused} icon={children} onPress={onPress} {...rest} />
  )
}
