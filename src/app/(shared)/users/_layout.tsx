import { Slot } from "expo-router";
import { UsersProvider } from "../../../modules/users/components/users-ctx/context";

export default function Layout() {
  return <UsersProvider><Slot /></UsersProvider>
}
