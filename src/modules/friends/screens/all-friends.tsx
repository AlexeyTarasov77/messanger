import { Alert, Text, TouchableOpacity } from "react-native";
import { Card } from "../components/card";
import { FriendCard } from "../components/friend-card";
import { Loader } from "../../../shared/ui/loader/loader";
import { useAllFriends } from "../hooks/use-all-friends";
import { useUserCtx } from "../../users/components/users-ctx/context";
import { friendsService } from "../services";
import { getErrorMessage } from "../../../shared/utils/errors";

export function AllFriends() {
  const { allFriends, isLoading, setAllFriends } = useAllFriends();
  const { user } = useUserCtx();
  if (isLoading || !user) return <Loader />;
  const deleteFriend = async (friendId: number) => {
    try {
      await friendsService.deleteFriend(
        friendId,
      );
    } catch (err) {
      console.error(err)
      return Alert.alert(getErrorMessage(err))
    }
    setAllFriends(allFriends.filter(friend => Number(friend.id) !== friendId))
  }
  return (
    <Card title={"Всі друзі"} seeAllLink={"/friends/all-friends"}>
      {allFriends.map((friend) => {
        return (
          <FriendCard
            key={friend.id}
            user={friend}
            leftButton={
              <TouchableOpacity
                // onPress={}
                className="flex-row items-center gap-1 bg-slive p-2 rounded-[1234]"
              >
                <Text className="text-white text-center pl-3 pr-3">
                  Повідомлення
                </Text>
              </TouchableOpacity>
            }
            rightButton={
              <TouchableOpacity
                onPress={async () => deleteFriend(Number(friend.id))}
                className="flex-row items-center gap-1 border border-slive p-2 rounded-[1234]"
              >
                <Text className="text-slive text-center pl-3 pr-3">
                  Видалити
                </Text>
              </TouchableOpacity>
            }
          />
        );
      })}
    </Card>
  );
}
