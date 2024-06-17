// import React from "react";
// import {Image, View, Text, TextInput} from "react-native";
// import images from "../constants/images";
// import icon from "../constants/icons";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Icons from "../constants/icons";
//
//
// export const Header = () =>{
//     return (
//         <View className={"top-0 p-5"}>
//
//                 <View className={"flex-row justify-between items-center gap-2"}>
//                         <View className={"flex-row justify-between items-center gap-2"}>
//                             <View>
//                                 <Image
//                                     source={icon.campusIcon}
//                                     className={"h-9 w-9 rounded"}
//                                 />
//                             </View>
//
//                             <View>
//                                     <Text className={"text-sm text-blue-gray-400 font-light"}>Let's Find Your</Text>
//                                     <Text className={"text-base font-bold"}>Favorite Home2</Text>
//                             </View>
//                         </View>
//                     <View style={{backgroundColor: "grey",width: 50,height:50,borderRadius:50}}>
//
//                     </View>
//
//                 </View>
//
//
//         </View>
//     )
// }


import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import icons from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Header = () => {
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });

    useEffect(() => {
        const fetchUserName = async () => {
            const firstName = await AsyncStorage.getItem("first_name");
            const lastName = await AsyncStorage.getItem("last_name");
            setUserName({ firstName, lastName });
        };

        fetchUserName();
    }, []);

    return (
        <View className={"top-0 p-5"}>
            <View className={"flex-row justify-between items-center gap-2"}>
                <View className={"flex-row justify-between items-center gap-2"}>
                    <View>
                        <Image
                            source={icons.campusIcon}
                            className={"h-9 w-9 rounded"}
                        />
                    </View>
                    <View>
                        {/*<Text className={"text-sm text-blue-gray-400 font-light"}>Let's Find Your</Text>*/}
                        <Text className={"text-base font-bold"}>{userName.firstName} {userName.lastName}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: "grey", width: 50, height: 50, borderRadius: 50 }}></View>
            </View>
        </View>
    );
};
