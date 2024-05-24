
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../constants/images";
import icon from "../../constants/icons"
import NextButton from "../../components/NextButton";
import {Redirect,router} from "expo-router";
import indexPage from "../index"


export default function ScreenTwo(){
    return(
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className = "w-full justify-center items-center h-full px-4">
                    <Image source={images.man} className="mb-10"/>

                    <View className="resize mb-7">
                        <Text className="text-3xl text-black font-bold text-center">
                            Find <Text style={{color:"#006FFF"}}>Your Perfect Home</Text> with Us Today
                        </Text>

                        <Text className="font-light text-center mt-4" style={{color:"#B9B3B3"}}>
                            Lorem ipsum is simply dummy test of the printing and typesetting industry </Text>
                    </View>
                    <View className="flex-row justify-between mt-16 px-4">

                        <View style={{ flexDirection: 'column', alignItems: 'center',marginLeft:130}}>
                            <Image source={icon.circ1} style={{ marginTop: 10}}/>
                        </View>
                        <NextButton handlePress={()=>router.push(indexPage)}/>

                        <TouchableOpacity className={"mt-14"}    onPress={()=>router.push("../(auth)/sign_up")} >
                            <Text style={{color:"#006FFF", position: 'absolute', right: 15}}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>



            </ScrollView>
        </SafeAreaView>
    );
}
