import React from "react";
import {Image, View, Text, TextInput} from "react-native";
import images from "../constants/images";
import icon from "../constants/icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icons from "../constants/icons";


export const Header = () =>{
    return (
        <View className={"top-0 p-5"}>

                <View className={"flex-row justify-between items-center gap-2"}>
                        <View className={"flex-row justify-between items-center gap-2"}>
                            <View>
                                <Image
                                    source={icon.campusIcon}
                                    className={"h-9 w-9 rounded"}
                                />
                            </View>

                            <View>
                                    <Text className={"text-sm text-blue-gray-400 font-light"}>Let's Find Your</Text>
                                    <Text className={"text-base font-bold"}>Favorite Home</Text>
                            </View>
                        </View>

                        <View>
                            <Image
                                source={images.profilePicture}
                                className={"h-10 w-10 rounded-full "}
                            />
                            <Image source={images.enterSearch}
                                      className={"h-8 w-10"} />
                        </View>
                </View>
                <View className={"flex-row items-center justify-between rounded-md"}>
                    <View>
                        <Image className={""} source={icon.searchIcon} size={20} color={"#000"}/>
                        <TextInput placeholder={"Search by Address, city or ZIP"}/>
                    </View>
                    <Image source={icon.enterSearch} className={"w-10 h-10"}/>
                </View>

        </View>
    )
}