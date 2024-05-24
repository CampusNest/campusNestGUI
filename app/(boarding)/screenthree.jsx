
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import images from "../../constants/images";
import icon from "../../constants/icons"
import GoBackButton from "../../components/GoBackButton";
import NextButton from "../../components/NextButton";
import {Redirect,router} from "expo-router";
import indexPage from "../index"



export default function Screenthree(){
    return(
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className = "w-full justify-center items-center h-full px-4">
                    <Image source={images.man2} className="mb-10"/>

                    <View className="resize mb-7">
                        <Text className="text-3xl text-black font-bold text-center">
                            <Text style={{color:"#006FFF"}}>Arrange Tours</Text> to View Properties
                        </Text>

                        <Text className="font-light text-center mt-4" style={{color:"#B9B3B3"}}>
                            Lorem ipsum is simply dummy test of the printing and typesetting industry </Text>
                    </View>
                    <View className="flex-row justify-between mt-16 px-4">
                        <GoBackButton
                            handlePress={() =>{router.push(indexPage)}}
                        />
                        <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={icon.circ3} style={{ marginTop: 10}}/>
                        </View>
                        <NextButton/>

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