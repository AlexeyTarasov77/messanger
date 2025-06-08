import { Tabs } from "expo-router";
import { tabs } from "./tabs";
import { StyleProp, TextStyle } from "react-native";

export function TabBar() {
  const tabBarLabelStyle: StyleProp<TextStyle> = {
    color: "black",
    fontWeight: "bold",
  };
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarLabelStyle,
            tabBarIcon: ({ size, focused }) => (
              <Icon active={focused} width={size} height={size} />
            ),
          }}
        />
      ))}
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
