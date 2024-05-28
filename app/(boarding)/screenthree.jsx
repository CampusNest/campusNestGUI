import React, { useRef } from 'react';
import { ScrollView, Text, View, Image,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import {Link, router} from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { debounce } from 'lodash';
import CircleShape from "../../components/CircleShape";
import {useNavigation} from "@react-navigation/native";

export default function Screenthree() {
    const swipeHandler = useRef(
        debounce((nativeEvent) => {
            if (nativeEvent.velocityX > 0.2) {
                router.push('../(boarding)/screenone');

            }
        }, 20)
    ).current;

    const handleGestureEvent = (event) => {
        event.persist();
        swipeHandler(event.nativeEvent);
    };



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="bg-white h-full">
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <PanGestureHandler
                        onGestureEvent={handleGestureEvent}
                        activeOffsetX={[-80, 80]}
                    >
                        <View className="w-full justify-center items-center h-full px-4">

                            <Link
                                href={'../(auth)/signup'}
                                className={'mb-16 ml-72'}
                                style={{ color: '#006FFF'}}
                            >
                                Skip
                            </Link>

                            <Image source={images.man2} className="mt-96"  style={{width:310, height: 290,borderRadius: 20,marginTop:530}}/>
                            <View className="resize mb-24">
                                <Text className="text-3xl text-black font-bold text-center">
                                    <Text style={{ color: "#006FFF" }}>Arrange Tours</Text> to View Properties
                                </Text>
                                <Text className="font-light text-center mt-4" style={{ color: "#B9B3B3" }}>
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry
                                </Text>
                            </View>
                            <View className="mb-96 px-4 "  style={{ alignItems: 'center',marginBottom:500 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:5}}>
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#006FFF" size={7} />

                                </View>

                                <Link
                                    href={'(auth)/signup'}
                                    style={styles.container}
                                    className="mt-9"
                                >
                                    Get Started
                                </Link>
                            </View>




                        </View>
                    </PanGestureHandler>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container:{
       width: 324,
        height: 50,
        backgroundColor: "#006FFF",
        color: "#fff",
        borderRadius: 50,
        textAlign: "center",
        fontSize: 18,
        paddingTop: 12.5

    },
});
