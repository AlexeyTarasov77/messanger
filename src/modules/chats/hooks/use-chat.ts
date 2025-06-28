import { useEffect, useState } from "react"
import { ChatGroupWithRelations, PersonalChatWithRelations } from "../types"
import { chatsService } from "../services/chats"
import { useUserCtx } from "../../users/components/users-ctx"

export function useGroupChat(chatId: number) {
  const [chat, setChat] = useState<ChatGroupWithRelations | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      try {
        const chat = await chatsService.getGroupChat(chatId)
        setChat(chat)
      } finally {
        setIsLoading(false)
      }
    }
    f()
  }, [])
  return { chat, isLoading, setChat }
}

export function usePersonalChat(chatId: number) {
  const [chat, setChat] = useState<PersonalChatWithRelations>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useUserCtx()
  useEffect(() => {
    if (!user) return;
    const f = async () => {
      try {
        const chat = await chatsService.getPersonalChat(
          chatId,
          user!.id
        );
        setChat(chat);
      }
      finally {
        setIsLoading(false)
      }

    };
    f();
  }, [user]);
  return { chat, setChat, isLoading }
} 
