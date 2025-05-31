import { ScrollView,} from "react-native";
import { Requests } from "./requests";
import { Recommendations } from "./recommendations";
import { AllFriends } from "./all-friends";
import { Links } from "../components/links";



export function Main(){
    return(
        <ScrollView className="bg-mainBg flex-1">
            {/* <Links/> */}
            <Requests/>
            <Recommendations/>
            <AllFriends/>
        </ScrollView>
    )
}