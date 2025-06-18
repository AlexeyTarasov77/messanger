import { Tabs } from "expo-router";
import { tabs } from "./tabs";
import { StyleProp, Text, TextStyle } from "react-native";

const excludedTabnames = ["settings", "profile/[id]"]

export function TabBar() {
  const tabBarLabelStyle: StyleProp<TextStyle> = {
    color: "darkBlue",
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 12,
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
      {excludedTabnames.map(name => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            href: null,
          }}
        />
      ))}
    </Tabs>
  );
}
