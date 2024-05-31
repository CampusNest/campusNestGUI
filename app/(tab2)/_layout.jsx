import {StyleSheet,Text,View, Image} from "react-native";
import {StatusBar} from "react-native-web";
import {Tabs,Redirect} from "expo-router";
import icons from "../../constants/icons"
import {FontAwesome} from "@expo/vector-icons";
import React from "react";

const TabIcon = ({ icon, color, name, focused }) => {
    const getIcon = () => {
        if (icon) {
            return (
                <Image
                    source={icon}
                    resizeMode={"contain"}
                    tintColor={color}
                    className={"w-6 h-6"}
                />
            );
        }

        const iconName = name === "Post" ? "plus" : "bell";
        return <FontAwesome name={iconName} size={24} color={color} />;
    };

    return (
        <View className={"items-center justify-center gap-2"}>
            {getIcon()}
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    );
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel : false,
                    tabBarActiveTintColor : "#3C94FF",
                    tabBarStyle:{
                        backgroundColor : "#fff",
                        borderTopWidth : 1,
                        borderTopColor : "#232533",
                        height : 84,

                    }


                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown : false,
                        tabBarIcon :
                            ({color, focused})=>(
                                <TabIcon
                                    icon={icons.home}
                                    color={color}
                                    name={"Explore"}
                                    focused={focused}
                                />
                            )
                    }}
                />
                <Tabs.Screen
                    name="location"
                    options={{
                        title: "location",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.location}
                                color={color}
                                name={"Search"}
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name={"Bookmark"}
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown : false,
                        tabBarIcon :
                            ({color, focused})=>(
                                <TabIcon
                                    icon={icons.profile}
                                    color={color}
                                    name={"Profile"}
                                    focused={focused}
                                />
                            )
                    }}
                />
            </Tabs>
        </>
    );

}

export default TabsLayout ;