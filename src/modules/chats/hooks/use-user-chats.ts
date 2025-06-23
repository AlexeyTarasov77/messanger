import { useEffect, useState } from "react";
import { chatsService } from "../services/chats";
import { ChatGroupWithLastMsg } from "../types";

export function useUserChats(personal?: boolean) {
  const [chats, setChats] = useState<ChatGroupWithLastMsg[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const f = async () => {
      setIsLoading(true)
      try {
        let chats: ChatGroupWithLastMsg[]
        if (personal) {
          chats = await chatsService.listPersonalChats()
        } else {
          chats = await chatsService.listGroupChats()
        }
        setChats(chats)
      } finally {
        setIsLoading(false)
      }
    }
    f()
  }, [])
  return { chats, isLoading }
}
