
import {ScrollView, Text, View, Image, TouchableOpacity, Linking} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../constants/images";
import icon from "../constants/icons"
import GoBackButton from "../components/GoBackButton";
import NextButton from "../components/NextButton";
import {Link, router} from "expo-router";





export default function Index(){

    return(
        <SafeAreaView className="bg-white h-full">
<ScrollView contentContainerStyle={{height:'100%'}}>
<View className = "w-full justify-center items-center h-full px-4">
<Image source={images.girl} className="mb-10"/>

    <View className="resize mb-7">
<Text className="text-3xl text-black font-bold text-center">
    Discover Properties <Text style={{color:"#006FFF"}}>Using The Map</Text>
</Text>

        <Text className="font-light text-center mt-4" style={{color:"#B9B3B3"}}>
            Lorem ipsum is simply dummy test of the printing and typesetting industry </Text>
    </View>
    <View className="flex-row justify-between mt-16 px-4">
        <GoBackButton
        handlePress={() =>{router.push('./(boarding)/screentwo')}}
        />
        <View style={{ flexDirection: 'column', alignItems: 'center'}}>
            <Image source={icon.circ2} style={{ marginTop: 10}}/>
        </View>
        <NextButton handlePress={() => router.push("./(boarding)/screenthree")}/>


            <Link href={"./(auth)/signup"} className={"mt-14"} style={{color:"#006FFF", position: 'absolute', right: 15}}>
                Skip
            </Link>


    </View>



</View>



</ScrollView>
        </SafeAreaView>
    );
}


