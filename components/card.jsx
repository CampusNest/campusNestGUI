import {SafeAreaView} from "react-native-safe-area-context";
import { Image, Text, View, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const {width, height} = Dimensions.get("screen")
const Card = ({price, apartmentType, image, isFirst})=>{
    return(
        <View classname={"absolute to-25%"}>
            <Image source={image} className={" rounded-[20px]"}/>
            <LinearGradient colors={["transparent" ,"rgba(0,0,0,.9)"]}
                className={"inset-y-0 inset-x-0 rounded-br-[20px] rounded-bl-[20px]"}
            >
                <View className={"absolute"}>
                    <Text className={""}> {price}</Text>
                    <Text classname={""}>{apartmentType}</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Card