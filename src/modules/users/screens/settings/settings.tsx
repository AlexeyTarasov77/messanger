import React, { useState } from "react"
import { PersonalInfo } from "./personal-info"
import { Albums } from "./albums"
import { Text, TouchableOpacity, View } from "react-native"

enum Tabs {
  PERSONAL_INFO = "Особиста інформація",
  ALBUMS = "Альбоми"
}

export function SettingsScreen() {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.PERSONAL_INFO)
  const tabComponents: Record<Tabs, React.FC> = {
    [Tabs.PERSONAL_INFO]: PersonalInfo,
    [Tabs.ALBUMS]: Albums
  }
  const CurrentTabComponent = tabComponents[currentTab]
  return (
    <View>
      <View className="flex-row gap-4 ml-4 mt-5 mb-5 h-5">
        {
          Object.values(Tabs).map((tabName, i) =>
            <View key={i}>
              <TouchableOpacity onPress={() => setCurrentTab(tabName)}>
                <Text className={`text-lg ${currentTab == tabName ? "font-bold text-darkBlue" : "text-grey"}`}>
                  {tabName}
                </Text>
              </TouchableOpacity>
              {currentTab == tabName && <View className="border-slive border-2 mt-2"></View>}
            </View>
          )
        }
      </View>
      {<CurrentTabComponent />}
    </View>
  )
}
