import { GET, POST } from "../../../shared/api/client";
import { ChatGroup, ChatGroupWithLastMsg, ChatGroupWithRelations, PersonalChatWithLastMsg, PersonalChatWithRelations } from "../types";

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
  },
  getPersonalChat: async (chatId: number, currUserId: number): Promise<PersonalChatWithRelations> => {
    const resp = await GET<ChatGroupWithRelations>("/messanger/chats/" + String(chatId));
    if (!resp.success) {
      throw new Error(resp.message);
    }
    const data = resp.data;
    if (!data.is_personal_chat) {
      throw new Error("fetched chat is not personal")
    }
    return { ...data, partner: data.admin_id == currUserId ? data.members[0] : data.admin }
  },
  getOrCreatePersonalChat: async (withUserId: number) => {
    const resp = await POST<ChatGroup>("/messanger/chats/personal", { withUserId });
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  }
}
