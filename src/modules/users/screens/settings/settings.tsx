import React, { useState } from "react";
import { PersonalInfoSection } from "./personal-info";
import { AlbumsSection } from "./albums";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

enum Tabs {
  PERSONAL_INFO = "Особиста інформація",
  ALBUMS = "Альбоми",
}

export function SettingsScreen() {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.PERSONAL_INFO);
  const tabComponents: Record<Tabs, React.FC> = {
    [Tabs.PERSONAL_INFO]: PersonalInfoSection,
    [Tabs.ALBUMS]: AlbumsSection,
  };
  const CurrentTabComponent = tabComponents[currentTab];
  return (
    <ScrollView>
      <View className="flex-row gap-4 ml-4 mt-5 mb-5">
        {Object.values(Tabs).map((tabName, i) => (
          <View key={i} className="gap-2">
            <TouchableOpacity onPress={() => setCurrentTab(tabName)}>
              <Text
                className={`text-lg ${currentTab == tabName ? "font-bold text-darkBlue" : "text-grey"}`}
              >
                {tabName}
              </Text>
            </TouchableOpacity>
            {currentTab == tabName && (
              <View className="border-slive border-2"></View>
            )}
          </View>
        ))}
      </View>
      {<CurrentTabComponent />}
    </ScrollView>
  );
}
