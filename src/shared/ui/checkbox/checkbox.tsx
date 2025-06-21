import clsx from "clsx";
import Checkbox, { CheckboxProps } from "expo-checkbox";
import { Control, Controller, ControllerProps } from "react-hook-form";


// export function UICheckbox({ className, control, name }: { className?: string, name: string, control: Control<any> }) {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ fieldState, field }) => (
//         <Checkbox
//           className={clsx(fieldState.error ? "border-red-500" : "border-2 border-slive bg-transparent", className)}
//           onChange={field.onChange}
//           value={field.value}
//           onValueChange={field.onChange}
//           color="#543C52"
//         />
//       )}
//     />
//   )
// }


export function UICheckbox({ className, ...props }: CheckboxProps) {
  return (
    <Checkbox
      className={clsx("border-2 border-slive bg-transparent", className)}
      color="#543C52"
      {...props}
    />
  )
}

