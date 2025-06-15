import { Tabs } from "expo-router";
import { tabs } from "./tabs";
import { StyleProp, Text, TextStyle } from "react-native";

export function TabBar() {
  const tabBarLabelStyle: StyleProp<TextStyle> = {
    color: "darkBlue",
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 12
  };
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "darkBlue" }}>
      {tabs.map(({ name, title, icon: Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarLabel: () => <Text style={tabBarLabelStyle}>{title}</Text>,
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
