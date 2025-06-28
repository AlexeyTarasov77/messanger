import { DELETE, GET, POST } from "../../../shared/api/client";
import { getImageData } from "../../../shared/utils/images";
import { ChatGroup, ChatGroupWithLastMsg, ChatGroupWithRelations, CreateGroupStep2Data, PersonalChatWithLastMsg, PersonalChatWithRelations } from "../types";

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
  },
  createChat: async (data: CreateGroupStep2Data & { is_personal_chat: boolean }) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("is_personal_chat", String(data.is_personal_chat))
    data.selectedMembers.forEach(member => {
      formData.append("membersIds", String(member.id))
    })
    formData.append("avatar", getImageData(data.avatar) as any)
    const resp = await POST<ChatGroup>("/messanger/chats", formData);
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  deleteChat: async (chatId: number) => {
    const resp = await DELETE("/messanger/chats/" + String(chatId));
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  leaveChat: async (chatId: number) => {
    const resp = await DELETE("/messanger/chats/leave/" + String(chatId));
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  }
}
