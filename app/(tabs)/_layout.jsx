import {StyleSheet,Text,View, Image} from "react-native";
import {StatusBar} from "react-native-web";
import {Tabs,Redirect} from "expo-router";
import icons from "../../constants/icons"

const TabIcon = ({icon, color, name, focused}) =>{
    return(
        <View className={"items-center justify-center gap-2"}>
            <Image
                source={icon}
                resizeMode={"contain"}
                tintColor={color}
                className={"w-6 h-6"}
            />
            <Text className={`${focused ? 'font-psemibold' :
                'font-pregular'
            } text-xs`} style={{color : color}}>
                {name}
            </Text>
        </View>
    )
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
                        title: "Location",
                        headerShown : false,
                        tabBarIcon :
                            ({color, focused})=>(
                                <TabIcon
                                    icon={icons.location}
                                    color={color}
                                    name={"search"}
                                    focused={focused}
                                />
                            )
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown : false,
                        tabBarIcon :
                            ({color, focused})=>(
                                <TabIcon
                                    icon={icons.bookmark}
                                    color={color}
                                    name={"Create"}
                                    focused={focused}
                                />
                            )
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