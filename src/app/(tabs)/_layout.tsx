import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
