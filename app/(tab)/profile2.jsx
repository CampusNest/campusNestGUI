import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native-web";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const AuthLayout = () => {
    const handleSubmit = async () => {
        await AsyncStorage.clear();
        router.push("../(auth)/signinLandlord")

    };


    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center min-h-[85vh] px-4 my-6"}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AuthLayout;
