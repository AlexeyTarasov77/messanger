import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from "nativewind";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { THEME_STORAGE_KEY } from '../shared/constants';

export default function App() {
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    const setTheme = async () => {
      const selectedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY) as ReturnType<typeof useColorScheme>["colorScheme"]
      setColorScheme(selectedTheme || "system")
    }
    setTheme()
  })
  return (
    <SafeAreaProvider>
      <SafeAreaView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

