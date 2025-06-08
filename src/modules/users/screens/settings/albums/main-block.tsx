import { Heading } from "../../../../../shared/ui/heading/heading";
import { RoundedButton } from "../../../../../shared/ui/button/button";
import { ICONS } from "../../../../../shared/ui/icons";
import { View } from "react-native";
import { Block } from "../block";

export function MainBlock() {
  return (
    <Block>
      <Heading label="Мої фото" action={
        <RoundedButton label="Додати фото" icon={<ICONS.PostsIcon />} />
      } />
    </Block>

  )
}
