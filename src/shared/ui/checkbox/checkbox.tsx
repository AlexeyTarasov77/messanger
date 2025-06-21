import clsx from "clsx";
import Checkbox, { CheckboxProps } from "expo-checkbox";



export function UICheckbox({ className, ...props }: CheckboxProps) {
  return (
    <Checkbox
      className={clsx("border-2 border-slive bg-transparent", className)}
      color="#543C52"
      {...props}
    />
  )
}

