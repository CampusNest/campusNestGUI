import React, { useRef } from 'react';
import { ScrollView, Text, View, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import icon from '../../constants/icons';
import {Link, router} from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { debounce } from 'lodash';
import { navigateToSignIn, navigateToIndexPage } from '../../components/navigation/navigate';
import CircleShape from "../../components/CircleShape";

export default function Screenthree() {
    const swipeHandler = useRef(
        debounce((nativeEvent) => {
            if (nativeEvent.velocityX > 0.2) {
                router.push(navigateToIndexPage);

            } else if (nativeEvent.velocityX < -0.2) {
                router.push("../(auth)/signup");
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

                            <Image source={images.man2} className="mb-10"  style={{width:310, height: 290,borderRadius: 20}}/>
                            <View className="resize mb-7">
                                <Text className="text-3xl text-black font-bold text-center">
                                    <Text style={{ color: "#006FFF" }}>Arrange Tours</Text> to View Properties
                                </Text>
                                <Text className="font-light text-center mt-4" style={{ color: "#B9B3B3" }}>
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry
                                </Text>
                            </View>
                            <View className="flex-row justify-between mt-12 px-4 ">
                                <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:5}}>
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#D2E0FF" size={5} />
                                    <CircleShape color="#006FFF" size={7} />

                                </View>
                            </View>


                        </View>
                    </PanGestureHandler>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
