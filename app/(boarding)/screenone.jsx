import React, { useRef } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import images from '../../constants/images';
import {Link, router} from 'expo-router';
import { debounce } from 'lodash';
import CircleShape from "../../components/CircleShape";

export default function ScreenOne() {
    const swipeHandler = useRef(
        debounce((nativeEvent) => {
            if (nativeEvent.velocityX > 0.2) {
                router.push('../(boarding)/screentwo');

            } else if (nativeEvent.velocityX < -0.2) {
                router.push('../(boarding)/screenthree');


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
                <ScrollView contentContainerStyle={{ height: '100%' }} scrollEnabled={false}>
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

                            <Image source={images.houseMan} className="mb-10" style={{width:310, height: 260}}/>
                            <View className="resize mb-7">
                                <Text className="text-3xl text-black font-bold text-center">
                                    Discover Properties
                                    <Text style={{ color: '#006FFF' }}> That Matches Your Preferred Location</Text>
                                </Text>
                                <Text className="font-light text-center mt-4" style={{ color: '#B9B3B3' }}>
                                    Browse through our extensive listings to find homes in the neighborhoods you love.
                                </Text>
                            </View>
                            <View className="flex-row justify-between mt-16 px-4 ">
                                <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:5}}>
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#006FFF" size={7} />
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
