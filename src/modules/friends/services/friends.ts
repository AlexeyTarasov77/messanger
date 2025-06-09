import { DELETE, GET, POST } from "../../../shared/api/client";
import { IUser } from "../../users/types";

export const friendsService = {
  allFriends: async () => {
    const resp = await GET<IUser[]>("/users/all-friends");
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  requests: async () => {
    const resp = await GET<IUser[]>("/users/requests");
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  recommendations: async () => {
    const resp = await GET<IUser[]>("/users/list-users");
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },

  block: async (userId: number) => {
    const resp = await POST<IUser[]>("/users/block-user", { userId });
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  createFriendRequest: async (toUserId: number) => {
    const resp = await POST<IUser[]>("/users/requests/create", {
      toUserId,
    });
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  deleteFriend: async (friendId: number) => {
    const resp = await DELETE("/users/delete-friend/" + friendId);
    if (!resp.success) {
      throw new Error(resp.message);
    }
  },
  acceptRequest: async (fromUserId: number) => {
    const resp = await POST<IUser[]>("/users/requests/accept", {
      fromUserId,
    });
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },
  declineRequest: async (fromUserId: number) => {
    const resp = await DELETE("/users/requests/decline/" + fromUserId);
    if (!resp.success) {
      throw new Error(resp.message);
    }
    return resp.data;
  },

  // message: async () => {}
};
