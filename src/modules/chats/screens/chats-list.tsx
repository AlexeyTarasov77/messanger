import { Link, useRouter } from "expo-router"
import { Button, TextInput, TouchableOpacity, Text, View } from "react-native"
import { UserIcon, PenIcon } from "../../../shared/ui/icons"

export function ChatsListScreen() {
  const router = useRouter()
  return (
    <View  className="flex-1 bg-zinc-900 dark:bg-gradient-to-b dark:from-cyan-200 dark:to-blue-300 px-4 pt-6">
      <View></View>

      <View  className="flex-row items-center justify-between mb-4">
        <View>
          {/* <UserIcon width={36} height={35} /> */}
        </View>
        <Text>Chats</Text>
      </View>

      <TextInput 
        placeholder="Search"
        placeholderTextColor="#999"
        className="bg-zinc-800 dark:bg-white dark:text-black text-white px-4 py-2 rounded-xl mb-4"
      />

      <TouchableOpacity onPress={() => router.navigate("/chats/1")} >
        <View>
          {/* <UserIcon width={36} height={35} /> */}
        </View>
        <View>
          <Text>Name</Text>
          <Text>Comandir the bes...</Text>
        </View>
        <Text>20:26</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/chats/1")} >
        {/* <PenIcon width={36} height={35} /> */}
      </TouchableOpacity>

      {/* <Button onPress={() => router.navigate("/chats/1")} title="Go to chat" /> */}
      {/* Link может обертывать только компонент Text по дефолту или компонент принимающий проп onPress (какой то из подвидов кнопок) С УКАЗАНИЕМ asChild для Link*/}
      {/* <Link href="/chats/2"><Text>Go to another chat</Text></Link> */}
    </View>
  )
}
