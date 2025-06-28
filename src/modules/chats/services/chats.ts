import { DELETE, GET, PATCH, POST } from "../../../shared/api/client";
import { getImageData } from "../../../shared/utils/images";
import { ChatGroup, ChatGroupWithLastMsg, ChatGroupWithMembers, ChatGroupWithRelations, CreateGroupStep2Data, PersonalChatWithLastMsg, PersonalChatWithRelations } from "../types";

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
  getGroupChat: async (chatId: number) => {
    const resp = await GET<ChatGroupWithRelations>("/messanger/chats/" + String(chatId));
    if (!resp.success) {
      throw new Error(resp.message);
    }
    resp.data.members.push(resp.data.admin) // admin is also member
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
    if (data.avatar) {
      formData.append("avatar", getImageData(data.avatar) as any)
    }
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
  },
  updateChat: async (data: Partial<ChatGroupWithMembers>, chatId: number) => {
    const formData = new FormData()
    if (data.name) {
      formData.append("name", data.name)
    }
    if (data.members) {
      data.members.forEach(member => {
        formData.append("membersIds", String(member.id))
      })
    }
    if (data.avatar) {
      formData.append("avatar", getImageData(data.avatar) as any)
    }
    const resp = await PATCH<ChatGroup>("/messanger/chats/" + String(chatId), formData);
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  }
}
