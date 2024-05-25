import React, { useRef } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import images from '../../constants/images';
import icon from '../../constants/icons';
import NextButton from '../../components/NextButton';
import {Link, router} from 'expo-router';
import { navigateToSignIn, navigateToIndexPage } from '../../components/navigation/navigate';
import { debounce } from 'lodash';
import CircleShape from "../../components/CircleShape";

export default function ScreenTwo() {
    const swipeHandler = useRef(
        debounce((nativeEvent) => {
            if (nativeEvent.velocityX < -0.2) {
                router.push(navigateToIndexPage);
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

                            <Image source={images.man} className="mb-10" style={{width:310, height: 260,borderRadius: 20}}/>
                            <View className="resize mb-7">
                                <Text className="text-3xl text-black font-bold text-center">
                                    Find <Text style={{ color: "#006FFF" }}>Your Perfect Home</Text> with Us Today
                                </Text>
                                <Text className="font-light text-center mt-4" style={{ color: "#B9B3B3" }}>
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry
                                </Text>
                            </View>
                            <View className="flex-row justify-between mt-12 px-4 ">
                                <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:5}}>
                                    <CircleShape color="#006FFF" size={7} />
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#D2E0FF" size={5} />


                                </View>
                            </View>




                        </View>
                    </PanGestureHandler>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
