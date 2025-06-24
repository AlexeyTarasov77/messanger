import { GET } from "../../../shared/api/client";
import { ChatGroupWithLastMsg, ChatGroupWithRelations, PersonalChatWithLastMsg } from "../types";

export const chatsService = {
  listGroupChats: async () => {
    const resp = await GET<ChatGroupWithLastMsg[]>("/messanger/chats");
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  listPersonalChats: async () => {
    const resp = await GET<PersonalChatWithLastMsg[]>("/messanger/chats/personal");
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  getChat: async (chatId: number) => {
    const resp = await GET<ChatGroupWithRelations>("/messanger/chats/" + String(chatId));
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  }
}
