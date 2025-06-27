
import { ICONS } from "../../../shared/ui/icons";
import {
  View,
} from "react-native";
import React, { ReactNode } from "react";

export function Menu({ buttons }: { buttons: ReactNode[] }) {
  return (
    <View className="absolute top-1/4 right-1/2 shadow-lg rounded-xl p-4 gap-4 bg-sliveLight z-10 w-80">
      <View className="ml-auto"><ICONS.PostSettingsIcon height={16} /></View>
      {buttons.map((btn, i) =>
        <React.Fragment key={i}>
          {i === buttons.length - 1 &&
            <View className="border border-border" />
          }
          {btn}
        </React.Fragment>
      )}
    </View>
  );
}
