import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import { RootLayout } from "../modules/main/screens/layouts/root-layout";
import { UsersProvider } from "../modules/users/components/users-ctx/context";
import { CreatePostModalProvider } from "../modules/posts/components";
import { CreateGroupModalProvider } from "../modules/chats/components";
import { UpdateAlbumModalProvider } from "../modules/album/components";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UsersProvider>
        <CreatePostModalProvider>
          <CreateGroupModalProvider>
            <UpdateAlbumModalProvider>
              <SafeAreaView style={{ flex: 1 }}>
                <RootLayout />
              </SafeAreaView>
            </UpdateAlbumModalProvider>
          </CreateGroupModalProvider>
        </CreatePostModalProvider>
      </UsersProvider>
    </SafeAreaProvider>
  )
}
