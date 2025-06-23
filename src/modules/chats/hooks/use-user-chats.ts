import { useEffect, useState } from "react";
import { chatsService } from "../services/chats";
import { ChatGroupWithLastMsg, PersonalChatWithLastMsg } from "../types";

export function useGroupChats() {
  const [chats, setChats] = useState<ChatGroupWithLastMsg[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      try {
        let chats: ChatGroupWithLastMsg[]
        chats = await chatsService.listGroupChats()
        setChats(chats)
      } finally {
        setIsLoading(false)
      }
    }
    f()
  }, [])
  return { chats, isLoading }
}

export function usePersonalChats() {
  const [chats, setChats] = useState<PersonalChatWithLastMsg[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      try {
        let chats: PersonalChatWithLastMsg[]
        chats = await chatsService.listPersonalChats()
        setChats(chats)
      } finally {
        setIsLoading(false)
      }
    }
    f()
  }, [])
  return { chats, isLoading }
}
