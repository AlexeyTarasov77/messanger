import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root-layout";
import { UsersProvider } from "../modules/users/components/users-ctx/context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UsersProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <RootLayout />
        </SafeAreaView>
      </UsersProvider>
    </SafeAreaProvider>
  )
}
