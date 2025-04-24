import { Link, useRouter } from "expo-router"
import { Button, Text, View } from "react-native"

export function ChatsListScreen() {
  const router = useRouter()
  return (
    <View>
      <Text>Chats screen</Text>
      <Button onPress={() => router.navigate("/chats/1")} title="Go to chat" />
      {/* Link может обертывать только компонент Text по дефолту или компонент принимающий проп onPress (какой то из подвидов кнопок) С УКАЗАНИЕМ asChild для Link*/}
      <Link href="/chats/2"><Text>Go to another chat</Text></Link>
    </View>
  )
}
