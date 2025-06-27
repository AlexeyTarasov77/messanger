import { useEffect, useState } from "react"
import { ChatGroupWithRelations } from "../types"
import { chatsService } from "../services/chats"

export function useChat(chatId: number) {
  const [chat, setChat] = useState<ChatGroupWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      try {
        const chat = await chatsService.getChat(chatId)
        setChat(chat)
      } finally {
        setIsLoading(false)
      }
    }
    f()
  }, [])
  return { chat, isLoading, setChat }
}
