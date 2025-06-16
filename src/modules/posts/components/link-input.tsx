import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "../../../shared/ui/input";
import { View } from "react-native";
import { RoundedButton } from "../../../shared/ui/button/button";

// export function LinkInput() {
//   const [links, setLinks] = useState<string[]>([""])
//   return (
//
//     links.map((input, i) => {
//       const tag = (
//         <Input
//           className="w-full"
//           placeholder="Напишіть посилання"
//           onChange={field.onChange}
//           onChangeText={field.onChange}
//           value={field.value || input}
//           label="Посилання"
//           autoCorrect={false}
//           err={fieldState.error}
//         />
//       )
//       return i + 1 == links.length ?
//         <View className="flex-row w-10/12 items-center gap-2" key={input.id}>
//           {tag}
//           <RoundedButton className="w-5 h-5 translate-y-1/2" icon={<ICONS.PlusIcon width={15} height={15} onPress={() => append({ value: "", id: (new Date()).getTime() })} />} />
//         </View> : tag
//     }
//     )
//
//   )
// }
