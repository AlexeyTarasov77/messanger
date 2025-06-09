import { Tabs } from "expo-router";
import { tabs } from "./tabs";
import { StyleProp, TextStyle } from "react-native";

export function TabBar() {
  const tabBarLabelStyle: StyleProp<TextStyle> = {
    color: "darkBlue",
    fontWeight: "bold",
  }
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarLabelStyle,
            tabBarIcon: ({ size }) => <Icon width={size} height={size} />,
          }}
        />
      ))}
    </Tabs>
  );

}
