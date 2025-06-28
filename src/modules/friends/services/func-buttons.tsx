import { Alert } from "react-native";
import { getErrorMessage } from "../../../shared/utils/errors";
import { friendsService } from "./friends";
import { useAllFriends } from "../hooks/use-all-friends";
import { useRecommendations } from "../hooks/use-recommendations";
import { useRequests } from "../hooks/use-requests";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXCLUDED_RECOMMENDED_USERS_KEY } from "../../../shared/constants";


// { showAll }: { showAll?: boolean }
export function funcButtons() {
    const { allFriends, setAllFriends } = useAllFriends();
    const { recommendations, setRecommendations, isLoading } = useRecommendations();
    const { requests, setRequests } = useRequests();
    const deleteFriend = async (friendId: number) => {
        try {
            await friendsService.deleteFriend(friendId);
        } catch (err) {
            console.error(err);
            return Alert.alert(getErrorMessage(err));
        }
        setAllFriends(
            allFriends.filter((friend) => Number(friend.id) !== friendId)
        );
    };

    // useEffect(() => {
    //         const func = async () => {
    //             const excludedIdsString = await AsyncStorage.getItem(
    //                 EXCLUDED_RECOMMENDED_USERS_KEY
    //             );
    //             if (!excludedIdsString) return;
    //             const excludedIds = excludedIdsString.split(",");
    //             setRecommendations(
    //                 recommendations.filter(
    //                     (user) => !excludedIds.includes(String(user.id))
    //                 )
    //             );
    //         };
    //         !showAll && !isLoading && func();
    //     }, [isLoading, showAll]);
    // const removeRecommendedUser = async (id: number) => {
    //     setRecommendations(
    //         recommendations.filter(
    //             (recommendedUser) => recommendedUser.id !== id
    //         )
    //     );
    //     await friendsService.removeRecommendedUser(String(id));
    // };
    // const createFriendRequest = async (toUserId: number) => {
    //     try {
    //         await friendsService.createFriendRequest(toUserId);
    //         setRecommendations(
    //             recommendations.filter(
    //                 (recommendedUser) => recommendedUser.id !== toUserId
    //             )
    //         );
    //     } catch (err) {
    //         console.error(err);
    //         Alert.alert("Не вдалося створити заявку. Спробуйте пiзнiше!");
    //     }
    // };

    const removeRequest = async (
        fromUserId: number,
        action: "accept" | "decline"
    ) => {
        try {
            if (action === "accept") {
                await friendsService.acceptRequest(fromUserId);
            } else {
                await friendsService.declineRequest(fromUserId);
            }
        } catch (err) {
            Alert.alert(getErrorMessage(err));
            return;
        }
        setRequests(
            requests.filter((fromUser) => Number(fromUser.id) !== fromUserId)
        );
    };

    const acceptRequest = async (fromUserId: number) =>
        await removeRequest(fromUserId, "accept");
    const declineRequest = async (fromUserId: number) =>
        removeRequest(fromUserId, "decline");

    return {
        deleteFriend,
        // removeRecommendedUser,
        // createFriendRequest,
        acceptRequest,
        declineRequest,
    };
}
