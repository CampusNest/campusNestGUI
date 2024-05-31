import React, {useEffect} from 'react';
import { ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import image from "../constants/images"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('./(boarding)/screentwo');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    // const handleToken = async () =>{
    //     const dataToken = await AsyncStorage.getItem("access_token")
    //     if (!dataToken){
    //         router.push('./(boarding)/screentwo');
    //     }else{
    //         router.push('./home2');
    //     }
    // }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className="w-full justify-center  items-center h-full px-4">
                    <Image source={image.splash} style={{width:365, height:550}}/>
                    <Image source={image.logo} style={{height: 40, width: 280}} className={"mt-7"}/>
                </View>

            </ScrollView>
        </SafeAreaView>

    );
}

// import React, { useEffect } from 'react';
// import { ScrollView, View, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import image from "../constants/images";
// import { AuthContent } from '../components/AuthContent';
//
// export default function Index() {
//     const router = useRouter();
//
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             router.push('./(boarding)/screentwo');
//         }, 3000);
//
//         return () => clearTimeout(timer);
//     }, [router]);
//
//     return (
//         <AuthContent>
//             <SafeAreaView>
//                 <ScrollView>
//                     <View className="w-full justify-center  items-center h-full px-4">
//                         <Image source={image.splash} style={{width: 365, height: 550}} />
//                         <Image source={image.logo} style={{height: 40, width: 280}} className={"mt-7"} />
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </AuthContent>
//     );
// }


